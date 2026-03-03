import type { ISignatureVerifier, VerifySignatureParams } from '../domain/ISignatureVerifier';

/**
 * Simulated signature verifier for development and testing.
 *
 * Validates structural correctness of inputs without real cryptography.
 * Accepts any non-empty signature of 130 hex chars (matching secp256k1 format)
 * or the literal string "valid-signature" for test convenience.
 *
 * Replace with EthSignatureVerifier once ethers.js is added to the package.
 */
export class SimulatedSignatureVerifier implements ISignatureVerifier {
  /** Matches a 0x-prefixed 65-byte hex string (Ethereum signature format) */
  private static readonly ETH_SIGNATURE_REGEX = /^0x[0-9a-fA-F]{130}$/;

  async verify(params: VerifySignatureParams): Promise<boolean> {
    const { walletAddress, nonce, signature } = params;

    if (!walletAddress || walletAddress.trim() === '') return false;
    if (!nonce         || nonce.trim() === '')         return false;
    if (!signature     || signature.trim() === '')     return false;

    // Accept test sentinel
    if (signature === 'valid-signature') return true;

    // Accept structurally valid Ethereum signature
    return SimulatedSignatureVerifier.ETH_SIGNATURE_REGEX.test(signature);
  }
}