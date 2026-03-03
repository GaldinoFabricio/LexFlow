import type { IJwtService } from '../domain/IJwtService';

export interface IssueJwtInput {
  readonly walletAddress: string;
}

export interface IssueJwtOutput {
  readonly token: string;
  readonly expiresAt: Date;
}

export class IssueJwtUseCase {
  constructor(private readonly jwtService: IJwtService) {}

  execute(input: IssueJwtInput): IssueJwtOutput {
    if (!input.walletAddress || input.walletAddress.trim() === '') {
      throw new Error('walletAddress is required to issue a JWT.');
    }

    const { token, expiresAt } = this.jwtService.sign({
      walletAddress: input.walletAddress.trim().toLowerCase(),
    });

    return { token, expiresAt };
  }
}