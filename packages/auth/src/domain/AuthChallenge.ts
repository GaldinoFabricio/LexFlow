/** Represents a wallet authentication challenge issued to a client */
export interface AuthChallenge {
  readonly nonce: string;
  readonly address: string;
  readonly expiresAt: Date;
  readonly message: string;
}