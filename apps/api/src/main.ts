import { createServer } from './server';
import { env } from './config/env';

const app = createServer();

app.listen(env.PORT, () => {
  console.log(`[api] Server running on http://localhost:${env.PORT}`);
  console.log(`[api] GET http://localhost:${env.PORT}/health`);
});