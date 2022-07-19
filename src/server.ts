import http from "http";

import { app } from "./index";

async function bootstrap() {
  const server = http.createServer(app);
  const port = process.env.PORT;
  server.listen(port, () => console.log("Server listening on port " + port));
}
bootstrap();
