import { body } from "express-validator";

export const userValidation = {
  signup: [
    body("email").exists().withMessage("email is required"),
    body("email").isEmail().withMessage("email is not valid"),

    body("username")
      .not()
      .isEmpty()
      .withMessage("username has to be longer then 2 charecters"),
    body("username").isLength({ min: 2 }).withMessage("first name is required"),

    body("phoneNum")
      .isNumeric()
      .optional({ nullable: true })
      .withMessage("enter a valid phone number"),

    body("password").exists().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
  ],
  login: [
    body("email").exists().withMessage("email is required"),
    body("email").isEmail().withMessage("please enter a valid email"),
    body("username")
      .not()
      .isEmpty()
      .withMessage("first name has to be longer then 2 charecters"),
    body("username").isLength({ min: 2 }).withMessage("first name is required"),
    body("password").exists().withMessage("password is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters"),
  ],
  updateUser: [
    body("username")
      .not()
      .isEmpty()
      .withMessage("username has to be longer then 2 charecters"),
    body("username").isLength({ min: 2 }).withMessage("first name is required"),
  ],
};

export const eventValidator = {
  event: [
    body("title").exists().withMessage("title is required"),
    body("title").isLength({ min: 2 }).withMessage("enter a valid title"),

    body("descraption").exists().withMessage("descrption is required"),
    body("title").isLength({ min: 2 }).withMessage("enter a valid descrption"),
  ],
};
