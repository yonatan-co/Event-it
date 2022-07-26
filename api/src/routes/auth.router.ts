import { Router } from "express";

import { userValidation as validator } from "../middleware/validator";
const controller = require("../controllers/auth");
// import controller from "../controllers/auth";

const router = Router();

// routes related to authentication
router.post("/signup", validator.signup, controller.default.signup);

router.post("/login", validator.login, controller.default.login);

export default router;
