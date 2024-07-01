/* */

import userModel from "../Models/userModel.js";

import billingModel from "../Models/billingModel.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

/***********************************************************************************************/
/***************************     1 : Creating Address Controller      **************************/
/***********************************************************************************************/

export const createBillingAddressController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { userId } = req.body;

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return next(errorHandler(404, "Please Login to add your address"));
    }

    // const existingEmail = await billingModel.findOne({
    //   email: req.body.email,
    // });

    // if (existingEmail) {
    //   return next(
    //     errorHandler(404, "This Email is Registered with another account!")
    //   );
    // }

    // const existingPhone = await billingModel.findOne({
    //   phone: req.body.phone,
    // });

    // if (existingPhone) {
    //   return next(errorHandler(404, "Please Enter Your Own Phone Number"));
    // }

    /* Then we will create the new-user and save it. */
    const newUser = new billingModel({
      ...req.body,
      userId: existingUser,
    });
    await newUser.save();

    res.status(200).json(newUser);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/***********************************************************************************************/
/***************************     2 : Getting address Controller      ***************************/
/***********************************************************************************************/

export const getBillingAddressController = async (req, res, next) => {
  /* */

  try {
    /* */

    const billingDetails = await billingModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (billingDetails.length !== 0) {
      /* */

      res.status(200).json(billingDetails);

      /* */
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/***********************************************************************************************/
/***************************     3 : Updating address Controller      **************************/
/***********************************************************************************************/

export const updateBillingAddressController = async (req, res) => {
  /* */

  try {
    /* */

    const { userId } = req.body;

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return res.status(200).send({
        success: true,
        message: "Please register first to update your address !",
      });
    }

    const updatedBillingAddress = await billingModel.findByIdAndUpdate(
      /* */

      /* We know the id is always present in req.params.id. */
      req.params.id,

      /* what we will update : */
      { ...req.body },

      { new: true }

      /* */
    );

    res.status(200).send({
      success: true,
      message: "Address updated successfully",
      updatedBillingAddress,
    });

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    console.log(error);

    res.status(401).send({
      success: false,
      message: "Error in updating the address",
      error,
    });

    /* */
  }

  /* */
};

/***********************************************************************************************/
/*****************************   4. Deleting address controller.   *****************************/
/***********************************************************************************************/

export const deleteBillingAddressController = async (req, res) => {
  /* */

  try {
    /* */

    const { userId } = req.body;

    const existingUser = await userModel.findById(userId);

    if (existingUser) {
      /* */

      const deletedAddress = await billingModel.findByIdAndDelete(
        req.params.id
      );

      res.status(200).send({
        success: true,
        message: "Successfully deleted the address",
        deletedAddress,
      });

      /* */
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error is deleting the address",
      error,
    });

    /* */
  }

  /* */
};
