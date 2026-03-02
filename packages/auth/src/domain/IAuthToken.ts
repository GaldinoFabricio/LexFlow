/** Represents a decoded, verified authentication token */
export interface IAuthToken {
  readonly userId: string;
  readonly phoneNumber: string;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
}