/** Port: verifies a wallet signature — implemented in infrastructure */
/*export interface ISignatureVerifier {
  verify(params: {
    message: string;
    signature: string;
    address: string;
  }): Promise<boolean>;
}*/

export interface VerifySignatureParams {
  readonly walletAddress: string;
  readonly nonce: string;
  readonly signature: string;
}

/** Port: verifies a wallet signature — implemented in infrastructure */
export interface ISignatureVerifier {
  verify(params: VerifySignatureParams): Promise<boolean>;
}
