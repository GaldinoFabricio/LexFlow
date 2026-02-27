import type { Request, Response, NextFunction } from "express";
import type { GetHealthUseCase } from "../../../application/use-cases/GetHealthUseCase";

export class HealthController {
  constructor(private readonly getHealthUseCase: GetHealthUseCase) {}

  get = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = await this.getHealthUseCase.execute();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };
}
