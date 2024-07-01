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
