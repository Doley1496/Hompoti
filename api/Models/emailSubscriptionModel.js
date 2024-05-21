/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const emailSchema = new mongoose.Schema(
  {
    /* */

    email: {
      type: String,
      required: true,
    },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const Email = mongoose.model("Email", emailSchema);

export default Email;
