import { Router } from "express";

import validator from "../middleware/validation";
const controller = require("../controllers/auth");
// import controller from "../controllers/auth";
const router = Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     parameters:
 *      - in: body
 *        name: catchphrase
 *        description: New catchphrase
 *        schema:
 *          type: object
 *          properties:
 *            userName:
 *              type: string
 *              required: true
 *            email:
 *              type: string
 *              required: true
 *            password:
 *              type: string
 *              required: true
 *            phonenum:
 *              type: string
 *              required: false
 *
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/signup", validator.signup, controller.default.signup);

router.post("/login", validator.login, controller.default.login);

export default router;
