/* */

import mongoose from "mongoose";

/* Importing and configuring the dotenv. */
import dotenv from "dotenv";
dotenv.config();

/* Connecting to the MongoDB server using mongoose. */
const connectionUrl = async (req, res) => {
  /* */

  try {
    /* */

    await mongoose.connect(process.env.MONGO_URL);

    /* when connected to the server. */
    console.log("Server is connected ...");

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    /* when not connected to the server. */
    console.log("Server is not connected ...");

    /* */
  }

  /* */
};

export default connectionUrl;
