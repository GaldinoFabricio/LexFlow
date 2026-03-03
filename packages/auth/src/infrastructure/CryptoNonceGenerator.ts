import { randomBytes } from 'crypto';
import type { INonceGenerator } from '../domain/INonceGenerator';

const NONCE_BYTES = 32;

export class CryptoNonceGenerator implements INonceGenerator {
  generate(): string {
    return randomBytes(NONCE_BYTES).toString('hex');
  }
}