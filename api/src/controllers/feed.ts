import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { join } from "path";
import { unlink } from "fs";

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
      const events = await EventToUser.find({ userId: userId })
        .populate("eventId")
        .populate("userId");
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
    try {
      const notAuthorized = await isAuthorized(req);
      if (notAuthorized) {
        throw notAuthorized;
      }

      const eventId = req.params.eventId;
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
  uploadImage: async (
    req: AutherizedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        const error = new Error("no file supplied");
        error.name = "ValidationFailed";
        throw error;
      }

      // console.log(join(__dirname, "..", req.file.path));

      // const notAuthorized = await isAuthorized(req);
      // if (notAuthorized) {
      //   throw notAuthorized;
      // }

      const eventId = req.query.event;
      const event = await Event.findById(eventId);

      // const error = allowedToModify(req, event);
      // if (error) {
      //   throw error;
      // }

      if (!event || event === null) {
        const error = new Error("no event found");
        error.name = "NotFound";
        throw error;
      }

      // console.log(req.file.path);

      const photo = req.file.path;
      console.log(photo);

      if (photo) {
        event.photos?.push(photo.replace("\\", "/"));
        const updatedEvent = await event.save();
        res.json({
          messgae: updatedEvent.photos,
        });
      }
    } catch (error: any) {
      handle(next, error);
    }
  },
};
