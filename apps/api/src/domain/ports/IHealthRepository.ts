import type { ServiceStatus } from '../value-objects/ServiceStatus';

export interface IHealthRepository {
  getStatus(): Promise<ServiceStatus>;
}