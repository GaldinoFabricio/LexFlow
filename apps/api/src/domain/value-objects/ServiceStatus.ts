export type ServiceStatusValue = "ok" | "degraded" | "down";

export interface ServiceStatusProps {
  readonly value: ServiceStatusValue;
  readonly version: string;
  readonly uptimeSeconds: number;
  readonly checkedAt: Date;
}

export class ServiceStatus {
  readonly value: ServiceStatusValue;
  readonly version: string;
  readonly uptimeSeconds: number;
  readonly checkedAt: Date;

  private constructor(props: ServiceStatusProps) {
    this.value = props.value;
    this.version = props.version;
    this.uptimeSeconds = props.uptimeSeconds;
    this.checkedAt = props.checkedAt;
  }

  static create(props: Omit<ServiceStatusProps, "checkedAt">): ServiceStatus {
    return new ServiceStatus({ ...props, checkedAt: new Date() });
  }

  isHealthy(): boolean {
    return this.value === "ok";
  }

  equals(other: ServiceStatus): boolean {
    return this.value === other.value && this.version === other.version;
  }

  toPlainObject(): ServiceStatusProps {
    return {
      value: this.value,
      version: this.version,
      uptimeSeconds: this.uptimeSeconds,
      checkedAt: this.checkedAt,
    };
  }
}
