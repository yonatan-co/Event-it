import { Router } from "express";

import controller from "../controllers/feed";
import validator from "../middleware/validator";

const router = Router();

router.get("/events", controller.userEvents);

router.get("/events/:eventId", controller.singleEvent);

router.post("/create-event", validator.event, controller.createEvent);

router.patch("/update-event/:eventId", validator.event, controller.updateEvent);

router.delete("/delete-event/:eventId", controller.deleteEvent);

export default router;
