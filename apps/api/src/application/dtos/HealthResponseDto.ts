export interface HealthResponseDto {
  readonly status: string;
  readonly version: string;
  readonly uptimeSeconds: number;
  readonly checkedAt: string;
}