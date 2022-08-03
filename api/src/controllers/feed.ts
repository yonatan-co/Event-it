import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

import { AutherizedRequest } from "../types/requests";

import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";
import { ServerError } from "../types/error";

import {
  handle,
  isAuthorized,
  allowedToModifyEvent as allowedToModify,
} from "../utils/error";

export default {
  userEvents: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      isAuthorized(req);

      const userId = req.userId;
      const events = await EventToUser.find({ userId: userId }).populate(
        "eventId"
      );
      if (!events) {
        const err: ServerError = new Error("no events found");
        err.status = 404;
        throw err;
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
      isAuthorized(req);

      const userId = req.userId;
      const event = await EventToUser.find({
        userId: userId,
        eventId: req.params.eventId,
      }).populate("eventId");
      if (!event) {
        const err: ServerError = new Error("no events found");
        err.status = 404;
        throw err;
      }
      // console.log(event);
      res.status(200).json({
        events: event,
      });
    } catch (err) {
      handle(next, err);
    }
  },
  createEvent: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    isAuthorized(req);

    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        const error: ServerError = new Error("Validation failed");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const userId = req.userId;
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
      isAuthorized(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error: ServerError = new Error("Validation failed");
        error.status = 422;
        error.data = errors.array();
        throw error;
      }

      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);

      if (!event) {
        const error: ServerError = new Error("no event found");
        error.status = 404;
        throw error;
      }

      allowedToModify(req, event);

      event.title = req.body.title;
      event.desc = req.body.desc;
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
    isAuthorized(req);

    const eventId = req.params.eventId;
    try {
      const event = await Event.findById(eventId);

      if (!event) {
        const error: ServerError = new Error("no event found");
        error.status = 404;
        throw error;
      }

      allowedToModify(req, event);
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
