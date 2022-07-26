import { Router } from "express";

import controller from "../controllers/feed";
import isAuth from "../middleware/isAuth";
import { eventValidator as validator } from "../middleware/validator";

const router = Router();

// CRUD operations for events.
router.get("/events", isAuth, controller.userEvents);

router.get("/events/:eventId", isAuth, controller.singleEvent);

router.post("/create", isAuth, validator.event, controller.createEvent);

router.patch(
  "/update/:eventId",
  isAuth,
  validator.event,
  controller.updateEvent
);

router.delete("/delete/:eventId", isAuth, controller.deleteEvent);

export default router;
