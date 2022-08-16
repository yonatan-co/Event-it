import { Router } from "express";

import controller from "../controllers/user";

import isAuth from "../middleware/isAuth";

const router = Router();

//operations for user manegment.

router.get("/:userId", isAuth, controller.singleUser);

// router.patch("/update/:userId", isAuth, controller.updateEvent);

router.delete("/delete/:userId", isAuth, controller.deleteUser);

export default router;
