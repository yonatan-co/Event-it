import { Request } from "express";
import { Express } from "express";
import multer, { FileFilterCallback } from "multer";

import path from "path";
import { v4 as uuid } from "uuid";

// configurates how the files are gonna be stored
export const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) {
    callback(null, "uploads");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    const guid = uuid();
    const path = guid.replace(/:/g, "-");
    callback(null, path);
  },
});

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
