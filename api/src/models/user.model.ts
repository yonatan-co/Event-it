import mongoose from "mongoose";

interface IUser {
  email: string;
  username: string;
  phoneNum?: string;
  profilePictureUrl?: string;
  password: string;
  admin: boolean;
  token?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    phoneNum: { type: String, required: false },
    profilePictureUrl: { type: String, required: false },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    token: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User };
