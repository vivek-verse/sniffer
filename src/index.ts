import "./connection";
import cors from "cors";
import express from "express";

import router from "./controllers";

function bootstrap() {
  const application = express();
  if (process.env.NODE_ENV === "local" || process.env.NODE_ENV === "dev") {
    const corsOptions = {
      origin: ["http://localhost:3000"],
    };
    application.use(cors(corsOptions));
  } else {
    application.use(cors());
  }

  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use("/v1", router);

  return application;
}

export const app = bootstrap();
