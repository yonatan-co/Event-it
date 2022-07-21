import index from "../controllers";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: testing route
 *     responses:
 *       200:
 *         description: bless you in hello world
 */
router.get("/", index.getIndex);

export default router;
