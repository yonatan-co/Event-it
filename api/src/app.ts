import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import indexRouter from "./routes/index.router";
import authRouter from "./routes/auth.router";
import feedRouter from "./routes/feed.router";
import userRouter from "./routes/user.router";
import errorHandler from "./controllers/error";

import "dotenv/config";
const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@event-it.hdu83.mongodb.net/EventIt?retryWrites=true&w=majority`;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// using routers.
app.use(indexRouter);
app.use("/auth", authRouter);
app.use("/feed", feedRouter);
app.use("/user", userRouter);
app.use(errorHandler);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    app.listen(8080);
    console.log("server started!");
  })
  .catch((err) => console.log(err));
