import { body } from "express-validator";

export default [
  body("title").exists().withMessage("title is required"),
  body("title").isLength({ min: 2 }).withMessage("enter a valid title"),

  body("desc").exists().withMessage("descrption is required"),
  body("title").isLength({ min: 2 }).withMessage("enter a valid descrption"),
];
