/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const userTokenSchema = new mongoose.Schema(
  {
    /* */

    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    token: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400 * 30, // 30 days
    },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model. */
const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
