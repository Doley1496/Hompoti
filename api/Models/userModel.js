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
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },

    role: { type: String, enum: ["admin", "customer"], default: "customer" },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model. */
const User = mongoose.model("User", userSchema);

export default User;
