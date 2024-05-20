/* */

import express from "express";

const router = express.Router();

import {
  updateUserProfileController,
  deleteUserProfileController,
  getLanlordDetailsController,
  createEmailSubscriptionController,
} from "../Controllers/userController.js";

import { verifyToken } from "../Middlewares/verifyUser.js";

/* ****************************    1: To Update the user-profile     ************************* */

/* Creating a route(api endpoint) ie. "/update-profile/:id" and when this api endpoint will be call 
   using axios/fetch then the controller ie. updateUserProfileController will get execute and in this
   controller we have written the logic to update the user's profile details.
   We are passing verifyToken middleware because only after verification of the token we will allow 
   the user to update his profile ie. before going to update the user we want to check the user is 
   verified or not. 
*/

router.post("/update-profile/:id", verifyToken, updateUserProfileController);

router.delete("/delete-profile/:id", verifyToken, deleteUserProfileController);

router.get("/:id", verifyToken, getLanlordDetailsController);

router.post("/emailSubscription", createEmailSubscriptionController);

export default router;
