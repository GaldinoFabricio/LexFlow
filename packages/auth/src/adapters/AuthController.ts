import type { Request, Response, NextFunction } from 'express';
import type { GenerateNonceUseCase } from '../application/GenerateNonceUseCase';
import { AuthenticateWalletUseCase } from '../application/AuthenticateWalletUseCase';

export class AuthController {
  constructor(
    private readonly generateNonce: GenerateNonceUseCase,
    private readonly authenticateWallet: AuthenticateWalletUseCase,
  ) {}

  /**
   * POST /auth/nonce
   * Body: { walletAddress: string }
   */
  nonce = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { walletAddress } = req.body as { walletAddress?: string };

      if (!walletAddress) {
        res.status(400).json({ error: 'walletAddress is required.' });
        return;
      }

      const result = this.generateNonce.execute({ walletAddress });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  /**
   * POST /auth/verify
   * Body: { walletAddress: string; nonce: string; signature: string }
   */
  verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { walletAddress, nonce, signature } =
        req.body as { walletAddress?: string; nonce?: string; signature?: string };

      if (!walletAddress || !nonce || !signature) {
        res.status(400).json({ error: 'walletAddress, nonce, and signature are required.' });
        return;
      }

      const result = await this.authenticateWallet.execute({ walletAddress, nonce, signature });

      if (!result.success) {
        res.status(401).json({ error: result.reason });
        return;
      }

      res.status(200).json({ token: result.token, expiresAt: result.expiresAt });
    } catch (err) {
      next(err);
    }
  };
}