import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router
  .route("/suggestions")
  .all((req: Request, _: Response, next: NextFunction) => {
    next();
  })
  .get(async (req: Request, res: Response, next: NextFunction) => {
    res.send({ Hello: "World" });
  });

export default router;
