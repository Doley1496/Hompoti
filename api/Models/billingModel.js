/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const billingSchema = new mongoose.Schema(
  {
    /* */

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    streetAddress: {
      type: String,
      default: "",
      required: true,
    },

    city: {
      type: String,
      default: "",
      required: true,
    },

    state: {
      type: String,
      default: "",
      required: true,
    },

    pincode: {
      type: Number,
      default: "",
      required: true,
    },

    /* Creating relationship between two models ie. todoModels and userModels with the help
       of the mongoose model name.
    */
    userId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const Billing = mongoose.model("Billing", billingSchema);

export default Billing;
