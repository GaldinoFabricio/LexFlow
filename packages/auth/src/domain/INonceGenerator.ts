/** Port: generates a cryptographically secure nonce — implemented in infrastructure */
export interface INonceGenerator {
  generate(): string;
}