import { NextFunction, Request, Response, Router } from "express";
import SuggestionsModel from "../models/suggestions.model";

const router = Router();

router
  .route("/suggestions")
  .all((req: Request, res: Response, next: NextFunction) => {
    next();
  })
  .get(async (req: Request, res: Response) => {
    const suggestions = await SuggestionsModel.getSuggestions(req);
    res.send({ suggestions });
  });

export default router;
