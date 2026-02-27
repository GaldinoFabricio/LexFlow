import type { ServiceStatus } from '../value-objects/ServiceStatus';

export interface IHealthService {
  check(): Promise<ServiceStatus>;
}