import mongoose, { Model, Schema } from "mongoose";

// a collection made the describe relations between events and users
interface IEventToUser {
  userId: mongoose.Schema.Types.ObjectId;
  eventId: mongoose.Schema.Types.ObjectId;
  creator?: boolean;
}

const EventToUserSchema = new mongoose.Schema<IEventToUser>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    creator: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const EventToUser = mongoose.model("EventToUser", EventToUserSchema);

export { EventToUser };
