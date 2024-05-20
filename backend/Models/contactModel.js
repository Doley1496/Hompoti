/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const contactSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    /* creating relationship between two models ie. todoModels and userModels with the help
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

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
