import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";

import indexRouter from "./routes/index.route";
import authRouter from "./routes/auth.route";
import feedRouter from "./routes/feed.route";

import errorHandler from "./controllers/error";

const MONGO_DB_URI =
  "mongodb+srv://yonco:1234@event-it.hdu83.mongodb.net/EventIt?retryWrites=true&w=majority";

const app = express();

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: "the 'Event it' API",
      description:
        "A REST API built with Express and MongoDB. the backend for Event it",
      version: "3.1.5",
    },
  },
  apis: [path.join(__dirname, "routes/*.route.ts")],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(bodyParser.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(indexRouter);
app.use(authRouter);
app.use("/feed", feedRouter);
app.use(errorHandler);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("server started!");
  })
  .catch((err) => console.log(err));
