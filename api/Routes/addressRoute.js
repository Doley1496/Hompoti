/* */

import express from "express";

const router = express.Router();

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

import {
  createBillingAddressController,
  getBillingAddressController,
  updateBillingAddressController,
  deleteBillingAddressController,
} from "../Controllers/addressController.js";

router.post(
  "/create-billingAddress",
  verifyJwtToken,
  createBillingAddressController
);

router.get(
  "/get-billingAddress/:id",
  verifyJwtToken,
  getBillingAddressController
);

router.put(
  "/update-billingAddress/:id",
  verifyJwtToken,
  updateBillingAddressController
);

router.delete(
  "/delete-billingAddress/:id",
  verifyJwtToken,
  deleteBillingAddressController
);

export default router;
