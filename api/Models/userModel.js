/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const userSchema = new mongoose.Schema(
  {
    /* */

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: Number,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model. */
const User = mongoose.model("User", userSchema);

export default User;
