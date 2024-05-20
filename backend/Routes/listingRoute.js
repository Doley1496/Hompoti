/* */

import express from "express";

const router = express.Router();

import {
  createListingController,
  deleteListingController,
  updateListingController,
  getParticularListingDetailsController,
  getProfileOwnerAllListingsController,
  getAllSearchListingsController,
} from "../Controllers/listingController.js";

import { verifyToken } from "./../Middlewares/verifyUser.js";

/* **************************     1: Creating Listing route     ******************************** */

/* 
   Creating a route(api endpoint) ie. "/createListing" and when this api endpoint will be call using 
   axios/fetch then the controller ie. createListingController will get execute and in this controller 
   we have written the logic to create products list.
   We are passing verifyToken middleware because only after verification of the token we will allow 
   the user to create product lists ie. before going to create products we want to check the user is 
   verified or not. 

   Similarly, for all the other routes.

*/

router.post("/createListing", verifyToken, createListingController);

router.delete("/deleteListing/:id", verifyToken, deleteListingController);

router.post("/updateListing/:id", verifyToken, updateListingController);

router.get(
  "/getParticularListingDetails/:id",
  getParticularListingDetailsController
);

router.get(
  "/getAll-listings/:id",
  verifyToken,
  getProfileOwnerAllListingsController
);

router.get("/getAllSearchListings", getAllSearchListingsController);

export default router;
