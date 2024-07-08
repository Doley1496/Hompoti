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

import { verifyJwtToken } from "./../Middlewares/verifyUser.js";

router.post("/createListing", verifyJwtToken, createListingController);

router.delete("/deleteListing/:id", verifyJwtToken, deleteListingController);

router.post("/updateListing/:id", verifyJwtToken, updateListingController);

router.get(
  "/getParticularListingDetails/:id",
  getParticularListingDetailsController
);

router.get("/getAllSearchListings", getAllSearchListingsController);

router.get(
  "/getAll-listings/:id",
  verifyJwtToken,
  getProfileOwnerAllListingsController
);

export default router;
