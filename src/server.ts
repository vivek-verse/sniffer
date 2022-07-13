import http from "http";

import { app } from "./index";

async function bootstrap() {
  const server = http.createServer(await app);
  const port = 3000;
  server.listen(port, () => console.log("Server listening on port " + port));
}
bootstrap();
