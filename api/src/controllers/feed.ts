import { NextFunction, Response, Request } from "express";
import { AutherizedRequest } from "../types/requests";

import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";

export default {
  createEvent: async (req: any, res: Response, next: NextFunction) => {
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
    },
    updateEvent: async (req: Request)
  },
};
