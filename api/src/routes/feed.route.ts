import { Router } from "express";

import controller from "../controllers/feed";
import isAuth from "../middleware/isAuth";
import validator from "../middleware/validator";

const router = Router();

router.get("/events", isAuth, controller.userEvents);

router.get("/events/:eventId", isAuth, controller.singleEvent);

router.post("/create-event", isAuth, validator.event, controller.createEvent);

router.patch(
  "/update-event/:eventId",
  isAuth,
  validator.event,
  controller.updateEvent
);

router.delete("/delete-event/:eventId", isAuth, controller.deleteEvent);

export default router;
