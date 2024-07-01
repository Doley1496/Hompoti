/* */

import express from "express";

const router = express.Router();

import { verifyToken } from "../Middlewares/verifyUser.js";

import {
  createBillingAddressController,
  getBillingAddressController,
  updateBillingAddressController,
  deleteBillingAddressController,
} from "../Controllers/addressController.js";

router.post("/create-billingAddress", createBillingAddressController);

router.get("/get-billingAddress/:id", verifyToken, getBillingAddressController);

router.put(
  "/update-billingAddress/:id",
  verifyToken,
  updateBillingAddressController
);

router.delete(
  "/delete-billingAddress/:id",
  verifyToken,
  deleteBillingAddressController
);

export default router;
