import type { IHealthService } from "../../domain/ports/IHealthService";
import { ServiceStatus } from "../../domain/value-objects/ServiceStatus";

const APP_VERSION = "0.0.1";

export class NodeHealthService implements IHealthService {
  async check(): Promise<ServiceStatus> {
    return ServiceStatus.create({
      value: "ok",
      version: APP_VERSION,
      uptimeSeconds: Math.floor(process.uptime()),
    });
  }
}
