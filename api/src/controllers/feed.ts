import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

import { AutherizedRequest } from "../types/requests";

import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";

import { handle, isAuthorized, allowedToModify } from "../utils/error";

export default {
  userEvents: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const userId = req.userId;
      const events = await EventToUser.find({ userId: userId }).populate(
        "eventId"
      );
      if (!events) {
        res.status(200).json({
          events: [],
        });
      }

      res.status(200).json({
        events: events,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
  singleEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);
      if (!event) {
        const error: Error = new Error("no events found");
        error.name = "NotFound";
        throw error;
      }
      res.status(200).json({
        event: event,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
  createEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const notAuthorized = await isAuthorized(req);
    if (notAuthorized) {
      throw notAuthorized;
    }

    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error: Error = new Error("Validation failed");
        error.name = "ValidationFailed";
        throw error;
      }

      const userId = req.userId;
      const newEvent = new Event({
        title: req.body.title,
        descraption: req.body.descraption,
        creator: userId,
      });
      const event = await newEvent.save();
      const eventToUser = new EventToUser({
        userId: userId,
        eventId: event._id,
        creator: true,
      });
      const relation = await eventToUser.save();
      res.status(201).json({
        event: event,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },

  updateEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: Error = new Error("Validation failed");
        error.name = "ValidationFailed";
        throw error;
      }

      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);
      console.log(event);
      if (!event) {
        const error: Error = new Error("no event found");
        error.name = "NotFound";
        throw error;
      }

      allowedToModify(req, event);

      event.title = req.body.title;
      event.descraption = req.body.descraption;
      const updatedEvent = await event.save();
      res.status(200).json({
        message: "event updated",
        event: updatedEvent,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
  deleteEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const notAuthorized = await isAuthorized(req);
    if (notAuthorized) {
      throw notAuthorized;
    }

    const eventId = req.params.eventId;
    try {
      const event = await Event.findById(eventId);

      if (!event) {
        const error: Error = new Error("no event found");
        error.name = "NotFound";
        throw error;
      }

      const error = allowedToModify(req, event);
      if (error) {
        throw error;
      }

      await event.delete();
      await EventToUser.deleteMany({ eventId: eventId });
      res.status(200).json({
        message: `event #${eventId} deleted`,
      });
    } catch (err: any) {
      handle(next, err);
    }
  },
};
