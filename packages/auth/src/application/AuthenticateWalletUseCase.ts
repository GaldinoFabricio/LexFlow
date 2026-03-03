import { ValidateWalletSignatureUseCase } from './ValidateWalletSignatureUseCase';
import { IssueJwtUseCase } from './IssueJwtUseCase';

export interface AuthenticateWalletInput {
  readonly walletAddress: string;
  readonly nonce: string;
  readonly signature: string;
}

export type AuthenticateWalletOutput =
  | { readonly success: true;  readonly token: string; readonly expiresAt: Date }
  | { readonly success: false; readonly reason: string };

export class AuthenticateWalletUseCase {
  constructor(
    private readonly validateSignature: ValidateWalletSignatureUseCase,
    private readonly issueJwt: IssueJwtUseCase,
  ) {}

  async execute(input: AuthenticateWalletInput): Promise<AuthenticateWalletOutput> {
    const validation = await this.validateSignature.execute({
      walletAddress: input.walletAddress,
      nonce:         input.nonce,
      signature:     input.signature,
    });

    if (!validation.success) {
      return { success: false, reason: validation.reason };
    }

    const { token, expiresAt } = this.issueJwt.execute({
      walletAddress: input.walletAddress,
    });

    return { success: true, token, expiresAt };
  }
}