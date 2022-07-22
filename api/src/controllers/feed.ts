import { NextFunction, Response, Request } from "express";
import { AutherizedRequest } from "../types/requests";

import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";
import { ServerError } from "../types/error";

// note: these middlewares don't have authorazition yet.
export default {
  createEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    // just for now.
    const userId = "62d67d46d1b3181b92531de2";
    try {
      const newEvent = new Event({
        title: req.body.title,
        desc: req.body.desc,
        creator: userId,
      });
      const event = await newEvent.save();
      const eventToUser = new EventToUser({
        userId: userId,
        eventId: event._id,
        creator: true,
      });
      const realtion = await eventToUser.save();
      res.status(201).json({
        message: "Event created",
        event: event,
        realtion: realtion,
      });
    } catch (err: any) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  },

  updateEvent: async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      const error: ServerError = new Error("no event found");
      error.status = 404;
      throw error;
    }
    event.title = req.body.title;
    event.desc = req.body.desc;
    event.mainPhoto = req.body.mainPhoto;
    const updatedEvent = await event.save();
    res.status(200).json({
      message: "event updated",
      event: updatedEvent,
    });
  },
  deleteEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {},
};
