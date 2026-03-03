const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export interface WalletAuthChallengeProps {
  readonly walletAddress: string;
  readonly nonce: string;
  readonly createdAt: Date;
}

export class WalletAuthChallenge {
  readonly walletAddress: string;
  readonly nonce: string;
  readonly createdAt: Date;

  private constructor(props: WalletAuthChallengeProps) {
    this.walletAddress = props.walletAddress;
    this.nonce         = props.nonce;
    this.createdAt     = props.createdAt;
  }

  static create(walletAddress: string, nonce: string, createdAt?: Date): WalletAuthChallenge {
    if (!walletAddress || walletAddress.trim() === '') {
      throw new Error('walletAddress is required');
    }
    if (!nonce || nonce.trim() === '') {
      throw new Error('nonce is required');
    }
    return new WalletAuthChallenge({
      walletAddress: walletAddress.trim().toLowerCase(),
      nonce:         nonce.trim(),
      createdAt:     createdAt ?? new Date(),
    });
  }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() - this.createdAt.getTime() > CHALLENGE_TTL_MS;
  }

  expiresAt(): Date {
    return new Date(this.createdAt.getTime() + CHALLENGE_TTL_MS);
  }

  toSignableMessage(): string {
    return [
      'Sign this message to authenticate.',
      `Wallet: ${this.walletAddress}`,
      `Nonce: ${this.nonce}`,
      `Expires: ${this.expiresAt().toISOString()}`,
    ].join('\n');
  }
}