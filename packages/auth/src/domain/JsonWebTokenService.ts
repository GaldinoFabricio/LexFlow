import jwt from 'jsonwebtoken';
import type { IJwtService, JwtPayload, SignedToken } from '../domain/IJwtService';
import type { JwtConfig } from './JwtConfig';

export class JsonWebTokenService implements IJwtService {
  constructor(private readonly config: JwtConfig) {}

  sign(payload: JwtPayload): SignedToken {
    const token = jwt.sign(
      { walletAddress: payload.walletAddress },
      this.config.secret,
      { expiresIn: this.config.expiresInSeconds },
    );

    const expiresAt = new Date(Date.now() + this.config.expiresInSeconds * 1000);

    return { token, expiresAt };
  }

  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, this.config.secret) as { walletAddress: string };

    if (!decoded.walletAddress) {
      throw new Error('JWT payload is missing walletAddress');
    }

    return { walletAddress: decoded.walletAddress };
  }
}