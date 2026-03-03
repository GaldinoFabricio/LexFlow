import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(JSON.stringify({
    level: "info",
    message: "Server running",
    url: "http://localhost:" + env.PORT,
    env: env.NODE_ENV,
  }));
});