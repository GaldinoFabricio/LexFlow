import type { AuthChallenge } from '../domain/AuthChallenge';
import type { IAuthToken } from '../domain/IAuthToken';

export interface IssueChalllengeInput {
  readonly address: string;
}

export interface VerifySignatureInput {
  readonly address: string;
  readonly nonce: string;
  readonly signature: string;
}

/** Orchestrates the full wallet auth flow */
export interface IAuthUseCase {
  issueChallenge(input: IssueChalllengeInput): Promise<AuthChallenge>;
  verifySignature(input: VerifySignatureInput): Promise<IAuthToken>;
}