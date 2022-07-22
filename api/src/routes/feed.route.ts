import { Router } from "express";

import controller from "../controllers/feed";

const router = Router();

router.post("/create-event", controller.createEvent);

export default router;
