/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const listingSchema = new mongoose.Schema(
  {
    /* */

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    regularPrice: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: true,
    },

    washrooms: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    furnished: {
      type: Boolean,
      required: true,
    },

    parking: {
      type: Boolean,
      required: true,
    },

    offer: {
      type: Boolean,
      required: true,
    },

    imageUrl: {
      type: Array,
      required: true,
    },

    userRef: {
      type: String,
      required: true,
    },

    /* */
  },
  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model. */
const listing = mongoose.model("listing", listingSchema);

export default listing;
