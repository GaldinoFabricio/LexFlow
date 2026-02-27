import express, { type Application } from "express";

// Infrastructure
import { InMemoryHealthRepository } from "./infrastructure/health/InMemoryHealthRepository";

// Application
import { GetHealthUseCase } from "./application/use-cases/GetHealthUseCase";

// Interfaces
import { HealthController } from "./interfaces/http/controllers/HealthController";
import { createHealthRouter } from "./interfaces/http/routes/health.router";
import { errorHandler } from "./interfaces/http/middlewares/errorHandler";
import { notFound } from "./interfaces/http/middlewares/notFound";

export function createServer(): Application {
  // ── Manual dependency injection ──────────────────────────────────────────
  const healthRepository = new InMemoryHealthRepository();
  const getHealthUseCase = new GetHealthUseCase(healthRepository);
  const healthController = new HealthController(getHealthUseCase);

  // ── Express app ──────────────────────────────────────────────────────────
  const app: Application = express();
  app.use(express.json());

  // ── Routes ───────────────────────────────────────────────────────────────
  app.use("/health", createHealthRouter(healthController));

  // ── Fallbacks (order matters) ─────────────────────────────────────────────
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
