import type { IHealthRepository } from "../../domain/ports/IHealthRepository";
import { ServiceStatus } from "../../domain/value-objects/ServiceStatus";

const APP_VERSION = "0.0.1";

export class InMemoryHealthRepository implements IHealthRepository {
  private readonly startedAt: number = Date.now();

  async getStatus(): Promise<ServiceStatus> {
    return ServiceStatus.create({
      value: "ok",
      version: APP_VERSION,
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
    });
  }
}
