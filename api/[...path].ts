import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleVercelApi } from '../server/vercelApi';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleVercelApi(req, res);
}
