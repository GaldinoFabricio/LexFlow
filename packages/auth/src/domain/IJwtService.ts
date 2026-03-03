export interface JwtPayload {
  readonly walletAddress: string;
}

export interface SignedToken {
  readonly token: string;
  readonly expiresAt: Date;
}

/** Port: signs and verifies JWTs — implemented in infrastructure */
export interface IJwtService {
  sign(payload: JwtPayload): SignedToken;
  verify(token: string): JwtPayload;
}