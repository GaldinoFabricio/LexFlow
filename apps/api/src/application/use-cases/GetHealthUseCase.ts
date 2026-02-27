import type { IQueryUseCase } from '../ports/IUseCase';
import type { IHealthRepository } from '../../domain/ports/IHealthRepository';
import type { HealthResponseDto } from '../dtos/HealthResponseDto';

export class GetHealthUseCase implements IQueryUseCase<HealthResponseDto> {
  constructor(private readonly healthRepository: IHealthRepository) {}

  async execute(): Promise<HealthResponseDto> {
    const status = await this.healthRepository.getStatus();

    return {
      status: status.value,
      version: status.version,
      uptimeSeconds: status.uptimeSeconds,
      checkedAt: status.checkedAt.toISOString(),
    };
  }
}