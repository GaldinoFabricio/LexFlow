// ── Application (use cases) ───────────────────────────────────────────────────
export { GenerateNonceUseCase } from './application/GenerateNonceUseCase';
export type { GenerateNonceInput, GenerateNonceOutput } from './application/GenerateNonceUseCase';
export { ValidateWalletSignatureUseCase } from './application/ValidateWalletSignatureUseCase';
export type { ValidateWalletSignatureInput, ValidateWalletSignatureOutput } from './application/ValidateWalletSignatureUseCase';
export { IssueJwtUseCase } from './application/IssueJwtUseCase';
export type { IssueJwtInput, IssueJwtOutput } from './application/IssueJwtUseCase';
export { AuthenticateWalletUseCase } from './application/AuthenticateWalletUseCase';
export type { AuthenticateWalletInput, AuthenticateWalletOutput } from './application/AuthenticateWalletUseCase';

// ── Infrastructure ────────────────────────────────────────────────────────────
export { CryptoNonceGenerator } from './infrastructure/CryptoNonceGenerator';
export { SimulatedSignatureVerifier } from './infrastructure/SimulatedSignatureVerifier';
export { JsonWebTokenService } from './infrastructure/JsonWebTokenService';
export { loadJwtConfig } from './infrastructure/JwtConfig';
export type { JwtConfig } from './infrastructure/JwtConfig';

// ── Express adapters ──────────────────────────────────────────────────────────
export { AuthController } from './adapters/AuthController';
export { createJwtMiddleware } from './adapters/JwtMiddleware';
export { createAuthRouter } from './adapters/auth.router';
export { AuthError, authErrorHandler } from './adapters/AuthErrorHandler';

// ── Domain ports (for custom implementations) ─────────────────────────────────
export type { INonceGenerator } from './domain/INonceGenerator';
export type { ISignatureVerifier, VerifySignatureParams } from './domain/ISignatureVerifier';
export type { IJwtService, JwtPayload, SignedToken } from './domain/IJwtService';