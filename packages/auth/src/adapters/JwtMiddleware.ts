import type { Request, Response, NextFunction } from 'express';
import type { IJwtService } from '../domain/IJwtService';

/** Augment Express Request to carry the verified wallet address */
declare global {
  namespace Express {
    interface Request {
      walletAddress?: string;
    }
  }
}

export function createJwtMiddleware(jwtService: IJwtService) {
  return function jwtMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Missing or invalid Authorization header.' });
      return;
    }

    const token = authHeader.slice('Bearer '.length).trim();

    try {
      const payload = jwtService.verify(token);
      req.walletAddress = payload.walletAddress;
      next();
    } catch {
      res.status(401).json({ error: 'Invalid or expired token.' });
    }
  };
}