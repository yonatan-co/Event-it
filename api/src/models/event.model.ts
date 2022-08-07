import mongoose, { ObjectId } from "mongoose";

// interface IPoint {
//   type: {
//     type: string;
//     enum: ["Point"];
//   };
//   coordinates: {
//     type: [Number];
//   };
// }

interface IPhoto {
  photoUrl: string;
  main: boolean;
}

export interface IEvent {
  title: string;
  desc: string;
  creator: ObjectId;
  location: string;
  date: Date;
  photos?: IPhoto[];
}

// const pointSchema = new mongoose.Schema<IPoint>({
//   type: {
//     type: String,
//     enum: ["Point"],
//     required: true,
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//   },
// });

const EventSchema = new mongoose.Schema<IEvent>(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    photos: [{ type: mongoose.Schema.Types.Array, required: false }],
    location: { type: String, requried: false },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

export { Event };
