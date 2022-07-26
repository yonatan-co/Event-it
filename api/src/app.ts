import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import indexRouter from "./routes/index.router";
import authRouter from "./routes/auth.router";
import feedRouter from "./routes/feed.router";
import userRouter from "./routes/user.router";
import errorHandler from "./controllers/error";

const MONGO_DB_URI =
  "mongodb+srv://yonco:1234@event-it.hdu83.mongodb.net/EventIt?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// using routers.
app.use(indexRouter);
app.use("/auth", authRouter);
app.use("/feed", feedRouter);
app.use("/user", userRouter);
app.use(errorHandler);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("server started!");
  })
  .catch((err) => console.log(err));
