/* */

import userModel from "../Models/userModel.js";

import listingModel from "../Models/listingModel.js";

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

  try {
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

    if (req.user.id === req.params.id) {
      /* */

      /* If we received the password of the user ie: when the user is trying to change the password then 
         before saving his password we will hash his password using hashSync() method of bcryptjs with 10
         rounds of salting. 
      */

      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }

      /* After hashing the password and if the user is authenticated(signIn) we will update the user 
         on basis of its id by using findByIdAndUpdate() mongoose method.
      */

      const updatedUser = await userModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.id,

        /* Then we will set(ie. update) all the changes made by the user in the input fields using $set:{} 
           method set is going to check, If the data is being changed then it will change that particular 
           data otherwise it will ignore that data. 
           We need to specify all of the fields individually so that user cannot send another information 
           that is not in the form.
        */

        {
          $set: {
            // username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },

        /* new: true => will actually return and it will save the new information of this updated user
           replacing the previous one ie. it will give us the updated information(profile). 
           If we don't add this then we will get the previous information for our response.
        */
        { new: true }
      );

      /*  Then we will destruct the password and the other details of the user separately because we will 
          not send the password to the user but only send the remaining details of the user.
          And we have to use ._doc because without it we cannot destruct the password (ie. remove the password).      
      */
      const { password, ...remainingDetails } = updatedUser._doc;

      /* After destructing the password and the other details of the user separately we will send a response
         with statusCode 200 and we will send all the remaining-details of the user in the json format to the 
         frontend so that everyone can see it. 
      */
      res.status(200).json(remainingDetails);

      /* */
    } else {
      return next(errorHandler(401, "You can only update your own account!."));
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/*******************************   2 : To Delete the user-profile Controller ***************************/
/*******************************************************************************************************/

/* Creating a Controller function with name deleteProfileController which contains the logic to delete
   the profile of a user.
*/

export const deleteUserProfileController = async (req, res, next) => {
  /* */

  try {
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

    if (req.user.id === req.params.id) {
      /* */

      /* If the id's matches then we will find the user on basis of its id and delete the user.
         We will get the id from req.params.id.
      */
      await userModel.findByIdAndDelete(req.params.id);

      /* After deleting the details of the user we will send a response with statusCode 200 and we will 
         send a message "User has been deleted." in the json format to the frontend. 
      */
      res.status(200).json("User has been deleted.");

      /* */
    } else {
      return next(errorHandler(401, "You can only delete your own account!"));
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/***************************      3 : Getting(Reading) user Controller  *****************************/
/*******************************************************************************************************/

/* Creating a Controller function with name getLanlordController which contains the logic to get all the 
   details of a particular property owner except his password.
*/

export const getLanlordDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will find the user on basis of its id and we will get the id of the user from req.params.id. */
    const user = await userModel.findById(req.params.id);

    /* If we don't find the user ( ie. if user doesn't exist ) for that particular id then we will 
       return an error by passing the middleware function errorHandler() that we created in errorHandler.js 
       with a statusCode of 404 and message as "User not found" inside the next() function.
    */
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    /*  If the user exist ie. if we get the user then we will destruct the password and the other 
        details of the user separately because we will not send the password to the user but only send
        the remaining details of the user.
        And we have to use ._doc because without it we cannot destruct the password (ie. remove the password).      
    */
    const { passpord: pass, ...remainingDetails } = user._doc;

    /* After destructing the password and the other details of the user separately we will send a response
       with statusCode 200 and we will send all the remaining-details of the user in the json format to the 
       frontend so that everyone can see it. 
    */
    res.status(200).json(remainingDetails);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/**************************     4 : Creating Controller for Complain-messages  *************************/
/*******************************************************************************************************/

/* Creating a Controller function with name emailSubscriptionController which contains the logic to 
   store all the email of the user provided in the email input form.
   ie. it will take the email from the user in the /emailSubscription (route) page 
   and stored it in our database collection.
*/

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

    /* If the user's complaint is created and saved in our database then we will send a response with 
       statusCode 200 and we will send the new-user's data in the json format to the frontend so that 
       everyone can see it. 
    */
    res.status(200).json(newEmail);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};
