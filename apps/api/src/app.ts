import express, { type Application } from "express";
import { env } from "./config/env";
import { errorHandler } from "./interfaces/http/middlewares/errorHandler";
import { notFound } from "./interfaces/http/middlewares/notFound";
import { HealthController } from "./interfaces/http/controllers/HealthController";
import { createHealthRouter } from "./interfaces/http/routes/health.router";
import { GetHealthUseCase } from "./application/use-cases/GetHealthUseCase";
import { InMemoryHealthRepository } from "./infrastructure/health/InMemoryHealthRepository";
import { ConsoleLogger } from "./infrastructure/logging/Logger";
import { createRootRouter } from "./routes";

export function createApp(): Application {
  const log = new ConsoleLogger("api");

  // ── Dependency injection composition root ─────────────────────────────
  const healthRepository = new InMemoryHealthRepository();
  const getHealthUseCase = new GetHealthUseCase(healthRepository);
  const healthController = new HealthController(getHealthUseCase);

  // ── Express app ───────────────────────────────────────────────────────
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // ── Feature routes ────────────────────────────────────────────────────
  app.use("/health", createHealthRouter(healthController));
  app.use("/api/v1", createRootRouter());

  // ── Fallback handlers (order matters) ─────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  log.info("App created", { env: env.NODE_ENV, port: env.PORT });
  return app;
}