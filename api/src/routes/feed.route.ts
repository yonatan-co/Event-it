import { Router } from "express";

import controller from "../controllers/feed";

const router = Router();

router.post("/create-event", controller.createEvent);

router.patch("/update-event/:eventId", controller.updateEvent);

export default router;
