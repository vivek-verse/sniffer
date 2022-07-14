import { Router } from "express";

import suggestionsController from "./suggestions.controller";

import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000 * (parseInt(process.env.RATE_LIMIT_MINS) || 1),
});

const router = Router();

router.use(limiter, suggestionsController);

export default router;
