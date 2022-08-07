import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";

import { AutherizedRequest } from "../types/requests";

import { Event } from "../models/event.model";
import { EventToUser } from "../models/eventToUser.model";
import { ServerError } from "../types/error";

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
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const eventId = req.params.eventId;
      const event = await Event.findById(eventId);
      if (!event) {
        const err: ServerError = new Error("no events found");
        err.status = 404;
        throw err;
      }
      res.status(200).json({
        event: event,
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
    const notAuthorized = await isAuthorized(req);
    if (notAuthorized) {
      throw notAuthorized;
    }

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
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

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
    const notAuthorized = await isAuthorized(req);
    if (notAuthorized) {
      throw notAuthorized;
    }

    const eventId = req.params.eventId;
    try {
      const event = await Event.findById(eventId);

      if (!event) {
        const error: ServerError = new Error("no event found");
        error.status = 404;
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
