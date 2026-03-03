import type { INonceGenerator } from '../domain/INonceGenerator';
import { WalletAuthChallenge } from '../domain/WalletAuthChallenge';

export interface GenerateNonceInput {
  readonly walletAddress: string;
}

export interface GenerateNonceOutput {
  readonly nonce: string;
  readonly walletAddress: string;
  readonly expiresAt: Date;
  readonly message: string;
}

export class GenerateNonceUseCase {
  constructor(private readonly nonceGenerator: INonceGenerator) {}

  execute(input: GenerateNonceInput): GenerateNonceOutput {
    const nonce     = this.nonceGenerator.generate();
    const challenge = WalletAuthChallenge.create(input.walletAddress, nonce);

    return {
      nonce:         challenge.nonce,
      walletAddress: challenge.walletAddress,
      expiresAt:     challenge.expiresAt(),
      message:       challenge.toSignableMessage(),
    };
  }
}