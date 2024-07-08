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

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

router.post("/update-profile/:id", verifyJwtToken, updateUserProfileController);

router.delete(
  "/delete-profile/:id",
  verifyJwtToken,
  deleteUserProfileController
);

router.get("/:id", verifyJwtToken, getLanlordDetailsController);

router.post("/emailSubscription", createEmailSubscriptionController);

router.get("/getSingleUser/:email", GetSingleUserDetailsController);

export default router;
