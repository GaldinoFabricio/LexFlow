import type { IAuthToken } from './IAuthToken';

/** Port: signs and verifies tokens — implemented in infrastructure */
export interface ITokenService {
  sign(userId: string, phoneNumber: string): Promise<string>;
  verify(token: string): Promise<IAuthToken>;
}