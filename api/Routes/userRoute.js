/* */

import express from "express";

const router = express.Router();

import {
  updateUserProfileController,
  deleteUserProfileController,
  getLanlordDetailsController,
  createEmailSubscriptionController,
  GetSingleUserDetailsController,
} from "../Controllers/userController.js";

import { verifyToken } from "../Middlewares/verifyUser.js";

router.post("/update-profile/:id", verifyToken, updateUserProfileController);

router.delete("/delete-profile/:id", verifyToken, deleteUserProfileController);

router.get("/:id", verifyToken, getLanlordDetailsController);

router.post("/emailSubscription", createEmailSubscriptionController);

router.get("/getSingleUser/:email", GetSingleUserDetailsController);

export default router;
