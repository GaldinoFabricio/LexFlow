import { Router } from 'express';
import type { AuthController } from './AuthController';

export function createAuthRouter(controller: AuthController): Router {
  const router = Router();
  router.post('/nonce',  controller.nonce);
  router.post('/verify', controller.verify);
  return router;
}