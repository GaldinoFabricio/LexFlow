/** Port: verifies a wallet signature — implemented in infrastructure */
export interface ISignatureVerifier {
  verify(params: {
    message: string;
    signature: string;
    address: string;
  }): Promise<boolean>;
}