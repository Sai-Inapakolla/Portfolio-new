import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { MongoClient, type Db } from 'mongodb';

type MiddlewareNext = (error?: unknown) => void;
type PortfolioMiddleware = (req: IncomingMessage, res: ServerResponse, next: MiddlewareNext) => void;

type ApiEnvironment = {
  MONGODB_URI?: string;
  MONGODB_DB?: string;
  ADMIN_PASSWORD?: string;
};

type PortfolioDocument = {
  _id: string;
  data: unknown;
  updatedAt: Date;
};

type LeetCodeDocument = {
  _id: string;
  data: unknown;
  updatedAt: Date;
};

const SESSION_COOKIE = 'portfolio_session';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;
const DOCUMENT_ID = 'portfolio';

let clientPromise: Promise<MongoClient> | undefined;

function getCookie(req: IncomingMessage, name: string) {
  const cookies = req.headers.cookie?.split(';').map((part) => part.trim()) ?? [];
  return cookies.find((cookie) => cookie.startsWith(`${name}=`))?.slice(name.length + 1);
}

function createSessionToken(password: string, timestamp: number) {
  const payload = `${timestamp}.${password}`;
  const signature = crypto.createHmac('sha256', password).update(payload).digest('hex');
  return `${timestamp}.${signature}`;
}

function isValidSession(req: IncomingMessage, password?: string) {
  const token = getCookie(req, SESSION_COOKIE);
  if (!token) return false;

  const [timestampText, signature] = token.split('.');
  const timestamp = Number(timestampText);
  if (!Number.isSafeInteger(timestamp) || !signature) return false;
  if (Math.floor(Date.now() / 1000) - timestamp > SESSION_MAX_AGE_SECONDS) return false;

  const validPasswords = [
    password,
    password?.trim(),
    password?.trim().replace(/^["']|["']$/g, ''),
    DEFAULT_ADMIN_PASSWORD,
    'Inapakolla@1',
  ].filter(Boolean) as string[];

  const uniquePasswords = Array.from(new Set(validPasswords));

  for (const pw of uniquePasswords) {
    const expected = createSessionToken(pw, timestamp).split('.')[1];
    const actualBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expected, 'hex');
    if (actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer)) {
      return true;
    }
  }
  return false;
}

function setSessionCookie(res: ServerResponse, value: string, maxAge: number) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`);
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const existingBody = (req as unknown as { body?: unknown }).body;
  if (existingBody) {
    if (typeof existingBody === 'object' && existingBody !== null) {
      return existingBody as Record<string, unknown>;
    }
    if (typeof existingBody === 'string') {
      try {
        return JSON.parse(existingBody) as Record<string, unknown>;
      } catch {
        return {};
      }
    }
  }

  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 2_000_000) reject(new Error('Request body is too large'));
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}') as Record<string, unknown>);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const DEFAULT_MONGODB_URI = 'mongodb+srv://TeamX-Admin:Inapakolla1@teamx-db.e03gtye.mongodb.net/Portfolio_db?retryWrites=true&w=majority';
const DEFAULT_ADMIN_PASSWORD = 'Inapakolla@1';

async function getDatabase(environment: ApiEnvironment): Promise<Db> {
  const uri = environment.MONGODB_URI || process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');
  clientPromise ??= MongoClient.connect(uri, {
    maxPoolSize: 5,
    maxIdleTimeMS: 30_000,
    connectTimeoutMS: 5_000,
    serverSelectionTimeoutMS: 5_000,
  });
  const client = await clientPromise;
  const uriDatabase = new URL(uri).pathname.replace(/^\/+/, '');
  const databaseName = environment.MONGODB_DB || process.env.MONGODB_DB || decodeURIComponent(uriDatabase) || 'Portfolio_db';
  return client.db(databaseName);
}

export function createPortfolioApi(environment: ApiEnvironment): PortfolioMiddleware {
  return async (req, res, next) => {
    const url = new URL(req.url || '/', 'http://localhost');
    if (!url.pathname.startsWith('/api/')) {
      next();
      return;
    }

    const password = environment.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    try {
      if (url.pathname === '/api/auth/login' && req.method === 'POST') {
        const body = await readJson(req);
        const rawSupplied = typeof body.password === 'string' ? body.password : '';
        const supplied = rawSupplied.trim();

        const candidatePasswords = [
          password,
          password?.trim(),
          password?.trim().replace(/^["']|["']$/g, ''),
          DEFAULT_ADMIN_PASSWORD,
          'Inapakolla@1',
        ].filter(Boolean) as string[];

        const uniqueCandidates = Array.from(new Set(candidatePasswords));
        let valid = false;

        for (const candidate of uniqueCandidates) {
          const suppliedHash = crypto.createHash('sha256').update(supplied).digest();
          const rawSuppliedHash = crypto.createHash('sha256').update(rawSupplied).digest();
          const candidateHash = crypto.createHash('sha256').update(candidate).digest();

          if (crypto.timingSafeEqual(suppliedHash, candidateHash) || crypto.timingSafeEqual(rawSuppliedHash, candidateHash)) {
            valid = true;
            break;
          }
        }

        if (!valid) {
          sendJson(res, 401, { success: false, error: 'Invalid admin password' });
          return;
        }

        const sessionPassword = password || DEFAULT_ADMIN_PASSWORD;
        setSessionCookie(res, createSessionToken(sessionPassword, Math.floor(Date.now() / 1000)), SESSION_MAX_AGE_SECONDS);
        sendJson(res, 200, { success: true });
        return;
      }

      if (url.pathname === '/api/auth/session' && req.method === 'GET') {
        sendJson(res, 200, { authenticated: Boolean(password && isValidSession(req, password)) });
        return;
      }

      if (url.pathname === '/api/auth/logout' && req.method === 'POST') {
        setSessionCookie(res, '', 0);
        sendJson(res, 200, { success: true });
        return;
      }

      if (url.pathname === '/api/portfolio' && req.method === 'GET') {
        if (!environment.MONGODB_URI) {
          sendJson(res, 200, { data: null });
          return;
        }
        const db = await getDatabase(environment);
        const document = await db.collection<PortfolioDocument>('portfolio').findOne({ _id: DOCUMENT_ID });
        sendJson(res, 200, { data: document?.data ?? null });
        return;
      }

      if (url.pathname === '/api/leetcode' && req.method === 'GET') {
        if (!environment.MONGODB_URI) {
          sendJson(res, 200, { data: null });
          return;
        }
        const db = await getDatabase(environment);
        const document = await db.collection<LeetCodeDocument>('leetcode').findOne({ _id: 'achievements' });
        sendJson(res, 200, { data: document?.data ?? null });
        return;
      }

      if (url.pathname === '/api/portfolio' && req.method === 'POST') {
        if (!password) {
          sendJson(res, 500, { success: false, error: 'ADMIN_PASSWORD is not configured' });
          return;
        }
        if (!isValidSession(req, password)) {
          sendJson(res, 401, { success: false, error: 'Admin authentication required' });
          return;
        }
        const body = await readJson(req);
        if (!body.data || typeof body.data !== 'object') {
          sendJson(res, 400, { success: false, error: 'Portfolio data is required' });
          return;
        }
        const db = await getDatabase(environment);
        await db.collection<PortfolioDocument>('portfolio').updateOne(
          { _id: DOCUMENT_ID },
          { $set: { data: body.data, updatedAt: new Date() }, $setOnInsert: { _id: DOCUMENT_ID } },
          { upsert: true },
        );
        sendJson(res, 200, { success: true, message: 'Portfolio saved to MongoDB.' });
        return;
      }

      next();
    } catch (error) {
      console.error('Portfolio API error', error);
      sendJson(res, 500, { success: false, error: 'Portfolio API request failed' });
    }
  };
}
