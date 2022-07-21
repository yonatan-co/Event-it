import mongoose, { ObjectId } from "mongoose";

interface IEvent {
  title: string;
  desc: string;
  creator: ObjectId;
  mainPhoto?: string;
  photos?: string[];
  contributers?: ObjectId[];
}

const EventSchema = new mongoose.Schema<IEvent>({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  mainPhoto: { type: String, required: false },
  photos: [{ type: String, required: false }],
  contributers: [
    { type: mongoose.Schema.Types.ObjectId, required: false, ref: "User" },
  ],
});

const Event = mongoose.model("Event", EventSchema);
