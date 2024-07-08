/* */

import userModel from "../Models/userModel.js";

import emailSubscriptionModel from "../Models/emailSubscriptionModel.js";

import bcryptjs from "bcryptjs";

import { errorHandler } from "./../Middlewares/errorHandler.js";

/*******************************************************************************************************/
/*******************************   1 : To Update the user-profile Controller ***************************/
/*******************************************************************************************************/

/* Creating a Controller function with name updateProfileController which contains the logic to update 
   the profile of a user.
   For updating the user we have to check the user is authenticated or not on basis of its id's.
*/

export const updateUserProfileController = async (req, res, next) => {
  /* */

  /* 1st we will check the user who is trying to update exist in our database or not.
       ie. he is the real owner of that account or not.

       If the id of the user ( ie. the user we save in req.user in verifyToken function of verifyUser.js ) 
       is equal to the id that we will get from the /update-profile/:id route that means the user is  
       authenticated ie. it is the account of this user. Therefore in that case we will hash his password
       and find the user on basis of his id and update, then we will destruct the password separately and 
       send the response of statusCode 200 with the remaining-details of the user in json format.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only update your own account!."
       inside the next() function.
  */

  try {
    /* */

    if (req.user.userId === req.params.id) {
      /* */

      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.id,

        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },

        { new: true }

        /* */
      );

      const { password, ...remainingDetails } = updatedUser._doc;

      res.status(200).json(remainingDetails);

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only update your own account!."));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************* */
/*******************************   2 : To Delete the user-profile Controller ********************* */
/************************************************************************************************* */

export const deleteUserProfileController = async (req, res, next) => {
  /* */

  /* 1st we will check the user who is trying to delete exist in our database or not.
       ie. he is the real owner of that account or not.

       If the id of the user ( ie. the user we save in req.user in verifyToken function of verifyUser.js ) 
       is equal to the id that we will get from the /delete-profile/:id route that means the user is  
       authenticated ie. it is the user we want to delete. Therefore in that case we will
       find the user on basis of its id and delete that user and send the response of statusCode 200 with 
       the listings in json format.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only delete your own account!"
       inside the next() function.
    */

  try {
    /* */

    if (req.user.userId === req.params.id) {
      /* */

      await userModel.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only delete your own account!"));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************** */
/***************************      3 : Getting(Reading) user Controller  *************************** */
/************************************************************************************************** */

export const getLanlordDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const user = await userModel.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const { passpord: pass, ...remainingDetails } = user._doc;

    res.status(200).json(remainingDetails);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************** */
/**************************     4 : Creating Controller for Complain-messages  ******************** */
/************************************************************************************************** */

export const createEmailSubscriptionController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    const existingEmail = await emailSubscriptionModel.findOne({ email });

    if (existingEmail) {
      return next(
        errorHandler(404, "Your email id is already registered with us")
      );
    }

    /* Then we will create the new-user and save it. */
    const newEmail = new emailSubscriptionModel({
      email: email,
    });

    await newEmail.save();

    res.status(200).json(newEmail);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const GetSingleUserDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const email = req.params.email;

    const existingUser = await userModel.findOne({ email });

    res.status(200).send({
      success: true,
      message: "Successfully got the user",
      existingUser,
    });

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
