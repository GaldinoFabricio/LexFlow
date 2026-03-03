import type { ISignatureVerifier } from '../domain/ISignatureVerifier';

export interface ValidateWalletSignatureInput {
  readonly walletAddress: string;
  readonly nonce: string;
  readonly signature: string;
}

export type ValidateWalletSignatureOutput =
  | { readonly success: true }
  | { readonly success: false; readonly reason: string };

export class ValidateWalletSignatureUseCase {
  constructor(private readonly signatureVerifier: ISignatureVerifier) {}

  async execute(
    input: ValidateWalletSignatureInput,
  ): Promise<ValidateWalletSignatureOutput> {
    const { walletAddress, nonce, signature } = input;

    if (!walletAddress || !nonce || !signature) {
      return { success: false, reason: 'walletAddress, nonce, and signature are all required.' };
    }

    const isValid = await this.signatureVerifier.verify({ walletAddress, nonce, signature });

    if (!isValid) {
      return { success: false, reason: 'Signature verification failed.' };
    }

    return { success: true };
  }
}