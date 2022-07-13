import { Router } from "express";

import suggestionsController from "./suggestions.controller";

const router = Router();

router.use(suggestionsController);

export default router;
