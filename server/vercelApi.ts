import type { IncomingMessage, ServerResponse } from 'node:http';
import { createPortfolioApi } from './portfolioApi.js';

const api = createPortfolioApi({
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB: process.env.MONGODB_DB,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
});

export function handleVercelApi(req: IncomingMessage, res: ServerResponse) {
  return api(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'API route not found' }));
  });
}
