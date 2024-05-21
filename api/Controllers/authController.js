/* */

import userModel from "../Models/userModel.js";

import contactModel from "../Models/contactModel.js";

import bcryptjs from "bcryptjs";

import { errorHandler } from "../Middlewares/errorHandler.js";

import JWT from "jsonwebtoken";

import { SendEmail } from "./emailController.js";

/*******************************************************************************************************/
/*******************************   1 : Testing Controller   ********************************************/
/*******************************************************************************************************/

export const testController = (req, res) => {
  res.json({
    message: "Running successsfully the test Route.",
  });
};

/*******************************************************************************************************/
/***************************      2 : Creating SignUp Controller      **********************************/
/*******************************************************************************************************/

/* Creating a Controller function with name SignUpController which contains the logic to register a 
   new user.
   ie. it will take all the details from the user in the /signUp (route) page such as their 
   name, email, password and stored it in our database collection.
*/

export const SignUpController = async (req, res, next) => {
  /* */

  try {
    /* */

    /*  Destructing all the schema value's from req.body. */
    const { firstName, lastName, email, phone, password } = req.body;

    /* Checking the current registering user is a existing user or not in our database
       using findOne() mongoose method on the basis of the user's email.
    */
    const existingEmail = await userModel.findOne({
      email: req.body.email,
    });

    /* If the user's email already exists in our database ie. already registered then we will return  
       an error by passing the middleware function errorHandler() that we created in errorHandler.js
       with statusCode 404 and send a message that "This Email is Already Registered! Please Login".
    */
    if (existingEmail) {
      return next(
        errorHandler(404, "This Email Is Already Registered! Please Login")
      );
    }

    /* Finding the phone number entered by the user is a existing phone number or not in our database
       using findOne() mongoose method on the basis of the user's phone number.
    */
    const existingPhone = await userModel.findOne({
      phone: req.body.phone,
    });

    /* If the user's phone number already exists in our database ie. already registered then we 
       will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with statusCode 404 and send a message that "Enter Your Valid Phone Number"
    */
    if (existingPhone) {
      return next(errorHandler(404, "Please Enter Your Own Phone Number"));
    }

    /* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
    const hashedPassword = bcryptjs.hashSync(password, 10);

    /* Then we will create the new-user and save it. */
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();

    /* If the user is created and saved in our database then we will send a response with statusCode 200 and 
       we will send the new-user's data in the json format to the frontend so that everyone can see it. 
    */
    res.status(200).json(newUser);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    // next(error);

    res.status(500).send({
      success: false,
      message: "Please connect to the internet",
      error,
    });

    /* */
  }
};

/*******************************************************************************************************/
/*****************************    3 : Creating SignIn Controller     ***********************************/
/*******************************************************************************************************/

/* Creating a Controller function with name SignInController which contains the logic for login a user.
   ie. it will check all the details entered by the user in the /signIn route(page) such as the email
   and password of the user in our database and if the details matches with the data of our 
   database then we will give access to our website.
*/

export const SignInController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Destructuring email and password from req.body. */
    const { email, password } = req.body;

    /* Checking the current logging user is a existing user or not in the users collection of our 
       Database using findOne() mongoose method on the basis of the user's email.
    */
    const validUser = await userModel.findOne({ email });

    /* If the user's email doesn't exists in our database ie. not registered then we will return an 
       error by passing the middleware function errorHandler() that we created in errorHandler.js
       with statusCode 404 and send a message that "Email not Registered! Please Register".
    */
    if (!validUser) {
      return next(errorHandler(404, "Email Not Registered! Please Register"));
    }

    /* If the email exists in our database then we will compared(match) the passwords.
       using bcryptjs compareSync() method. 
       ie. the password entered by the user and the registered password present in our database.    
    */
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    /* If the passwords does not match then we will return an error by passing the middleware function 
       errorHandler() that we created in errorHandler.js with statusCode 401 and send a Validation message 
       ie. "Wrong Credentials". 
    */
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials"));
    }

    /* When user's email and password match then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
    */

    /* We know using JWT we can create token which helps us in security similar to salting.
       Creating a token by using sign method of json-web-token(JWT) on basis of the user's id and
       the json-web-token secret key we created in .env file and providing expiry date for the token.

       The token number will be generated when the signIn is successful.

    */

    const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    /* Then we will destruct the password and the other details of the user separately from the 
       validUser._doc because we will not send the password of the user we will only send other details
       of the user. And we have to use ._doc because without it we cannot destruct the details. 
    */
    const { password: pass, ...remainingUserDetails } = validUser._doc;

    /* After destructing the password and the other details of the user separately we will set the cookie 
       with name "access_token" and its value will be the token we created using json-web-token and we will 
       set the httpOnly true so that no third party app can access our cookie ie.. to make our cookie more 
       secure and provide a time of 6-mins for the token to expire and we will send a response status of 200
       and the remaining details of the user in the json format to the frontend so that everyone can see it.
       
       { expire: 360000 + Date.now() } or { maxAge: 360000 } 

    */

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(remainingUserDetails);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/**************************       4 : Creating google-Oauth Controller     *****************************/
/*******************************************************************************************************/

/* Creating a Controller function with name googleOauthController which contains the logic to signIn 
   a existing user OR if the user doesn't exist then we will register that new user in our database.
   We will get the details such as name,email,photo of the user from his email.
   ie. It will check the email of the user exist in our database or not and if the email exist then it
       give the user access into our website.Otherwise it will create as a new user with the details 
       received from the user's email-Id.
*/

export const GoogleOauthController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Checking the current user exists in our database or not on basis of its email using 
       findOne mongoose method. 
    */
    const user = await userModel.findOne({ email: req.body.email });

    /* When user's email exists in our database then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.

       Otherwise we will create a new user.
      
    */

    if (user) {
      /* */

      /* We know using JWT we can create token which helps us in security similar to salting.
         Creating a token by using sign method of json-web-token(JWT) on basis of the user's id and
         the json-web-token secret key we created in .env file and providing expiry date for the token.

         The token number will be generated when the signIn is successful.

      */

      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      /* Then we will destruct the password and the other details of the user separately from the 
         validUser._doc because we will not send the password of the user we will only send other details
         of the user. And we have to use ._doc because without it we cannot destruct the details. 
      */

      const { password: pass, ...remainingUserDetails } = user._doc;

      /* After destructing the password and the other details of the user separately we will set the cookie 
         with name "access_token" and its value will be the token we created using json-web-token and we will 
         set the httpOnly true so that no third party app can access our cookie ie.. to make our cookie more 
         secure and provide a time of 6-mins for the token to expire and we will send a response status of 200
         and the remaining details of the user in the json format to the frontend so that everyone can see it. 
         
          { expire: 360000 + Date.now() } or { maxAge: 360000 } 
      */

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(remainingUserDetails);

      /*  If user's email doesn't exist in our database then we will create a new user and save it.

          To create a user we have to ----

         * generate a random password.
         * then we will hashed that password.
         * then we will create that new user and save it.
         * create a token.
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
      */

      /* */
    } else {
      /* */

      /* Generating a random password because in our model we gave password field as required and if we 
         donot provide a password then we will get an error.
         By signing up with google we don't actually get a password from google.
         Therefore we will generate a random password for the user and whenever the user wants to update 
         the password they can update their password.
     
         We are creating a unique password of 16 characters. 8 + 8 
         Using Math.random() we are generating a number and converting the number to string 
         Here. 36 means numbers from 0 to 9 and also letters from a-z ie. it will form a password with 
         random numbers and letters together and we will take only the last eight digits from both the 
         generated string (password) and formed a 16 digit characters.
      */

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      /* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      /* Then we will create the new-user and save it. */
      const newUser = new userModel({
        /* */

        /* The username should be connected not separated. So Inorder to get separated we need to:
              
           1st we will have to split the name with a space and 
           2nd we will join the name without a space and
           3rd we will convert them to lowercase 
           4th we will add some random numbers and letters at the end to make them unique and we will take
               only the last four digits of the generated string. 
        */

        // username:
        //   req.body.name.split(" ").join("").toLowerCase() +
        //   Math.random().toString(36).slice(-4),

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      /* We know using JWT we can create token which helps us in security similar to salting.
         Creating a token by using sign method of json-web-token(JWT) on basis of the user's id and
         the json-web-token secret key we created in .env file and providing expiry date for the token.
         The token number will be generated when the signIn is successful.
      */

      const token = JWT.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      /* Then we will destruct the password and the other details of the user separately from the 
         newUser._doc because we will not send the password of the user we will only send other details
         of the user. And we have to use ._doc because without it we cannot destruct the details. 
      */

      const { password: pass, ...remainingUserDetails } = newUser._doc;

      /* After destructing the password and the other details of the user separately we will set the cookie 
         with name "access_token" and its value will be the token we created using json-web-token and we will 
         set the httpOnly true so that no third party app can access our cookie ie.. to make our cookie more 
         secure and provide a time of 6-mins for the token to expire and we will send a response status of 200
         and the remaining details of the user in the json format to the frontend so that everyone can see it. 
         
         { expire: 360000 + Date.now() } or { maxAge: 360000 } 
      */

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(remainingUserDetails);
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/*****************************    5 : Creating SignOut Controller     **********************************/
/*******************************************************************************************************/

/* Creating a Controller function with name SignOutController which contains the logic to signOut an 
   existing user.
*/

export const SignOutController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* To signOut a user we have to simply clear the cookie. So we are clearing the cookie with 
       name access_token.
    */
    res.clearCookie("access_token");

    /* After clearing the cookie of the user we will send a response with statusCode 200 and we will 
       send a message that "User has been logged Out!" in the json format. 
    */
    res.status(200).json("User has been logged Out!");

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/**************************     6 : Creating Controller for Complain-messages  *************************/
/*******************************************************************************************************/

/* Creating a Controller function with name ComplainMessageController which contains the logic to 
   store all the details of the complaint form of the contact-page.
   ie. it will take all the details from the user in the /contact (route) page such as their 
   name, email, phone, message etc.  and stored it in our database collection.
*/

export const ComplainMessageController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1. We are destructing all the schema's that the user enter's in the input field using 
          req.body and checking the current user who is trying to send us a message is a existing 
          user or not using findOne() mongoose method on the basis of the user's id.
          And we are also checking that the email is registered with us or not.
          Because the user need to be a existing user to send us a message.

          If the id does not exist in our database (ie. that means the user is not logged in) then 
          we send the user that "Please Login to sent us a message".
          because we will get the id of the user after successful logged-in only.
          If the email does not exist then we will send that "Please enter your register email-id".
    */

    const { firstName, lastName, email, phone, message, id } = req.body;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return next(errorHandler(404, "Please login to sent us a message"));
    }

    // const existingEmail = await userModel.findOne({ email: req.body.email });

    // if (!existingEmail) {
    //   return next(errorHandler(404, "Please enter your register email id"));
    // }

    /* Then we will create the new-user and save it. */
    const newUser = new contactModel({
      firstName,
      lastName,
      email,
      phone,
      message,

      /* Passing the id of the current existing-user.
         Here existingUser will contain the id of the current existing-user. 
      */
      userId: existingUser,
    });
    await newUser.save();

    /* If the user's complaint is created and saved in our database then we will send a response with 
       statusCode 200 and we will send the new-user's data in the json format to the frontend so that 
       everyone can see it. 
    */

    res.status(200).json(newUser);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/**************************     7 : Creating Controller for sending link  ******************************/
/*******************************************************************************************************/

/* Creating a Controller function with name SendLinkController which contains the logic to send a 
   email to the user's email-id the email that he provided in the input field of the /sendLink route. 
   ie. it will take the email send from the frontend in the /sendLink (route) page
   and send to the user's email-id.
*/

export const SendLinkController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1. We are getting the email that the user enter's in the input field using req.body 
          and checking that email exist in our database or not.
     
          If the email does not exist then we will send that "User does not exist".
    */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return next(errorHandler(404, "User doesn't exist"));
    }

    /* 2. If the user's email-id exist in our database then we will create a token.

          We will create a token by using sign method of json-web-token(JWT) on basis of the user's id, 
          user's email and the secret_key and provide an expiry time for the token.

          We will create this secret_key by the combination of jwt-secret and user's password.
    
          We are passing this email and id of the user because with this email and id the JWT will 
          create a token that will contain this email and id and from this token we can extract the 
          email and the id.
    */

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    /* 3. Then we will create a link which we will send to the user's email through which the user
          will reset his password and in this link we will also pass the user's id and the token created.
    */
    const link = `http://localhost:5173/reset-password/${existingUser._id}/${token}`;

    /* 4. Sending the link we created to the user's email using nodemailer. */

    SendEmail({
      email: existingUser.email,
      subject: "Password change request link received",
      message: link,
      html: `
      <p>Please click on the following link to reset your password:</p>
      <a href= "http://localhost:5173/reset-password/${existingUser._id}/${token}" >Reset Password</a>
      `,
    });

    /* 5. After sending the email successfully we will send a response of 200 with a message. */

    res.status(200).json({
      status: "success",
      message: "Password reset link has been send to the user's email.",
    });

    /* */

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/**************************     8 : Creating Controller to reset-password  *****************************/
/*******************************************************************************************************/

/* Creating a Controller function with name ResetPasswordController which contains the logic to reset the 
   password of the user's with the newPassword he provided in the /reset-password/:id/:token route(page) 
   ie. it will take the newPassword send from the frontend in the /reset-password/:id/:token (route) page
   and update the old-password with this new password.
*/

export const ResetPasswordController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1. We are getting the newPassword and confirmPassword that the user enter's in the input 
          field using req.body.

          And we are also getting the id and the token of the user from the route using req.params 
          and checking that user's id exist in our database or not.
     
          If the id does not exist then we will send that "User does not exist".
    */

    const { newPassword, confirmPassword } = req.body;

    const { id, token } = req.params;

    const existingUser = await userModel.findOne({ _id: id });

    if (!existingUser) {
      return next(errorHandler(404, "User doesn't exist"));
    }

    /* 2. If the user's id exist in our database then we will check the password and the 
          confirm-password is matching or not.
          If both the pasword is matching then we will verify that this link is active or expired.
          Else we will return an error message.

          We will verify by using verify method of json-web-token(JWT) on basis of the user's token, 
          and the user's secret_key.

          We will create this secret_key by the combination of jwt-secret and user's password.

          If verified(active) then we will find the id, hashed the password, update the password 
          and if updated we will return a success message. 
          Else we will return a message that link has expired.
    */

    if (newPassword === confirmPassword) {
      /* */

      // const secret_key = process.env.JWT_SECRET + existingUser.password;

      const verify = await JWT.verify(token, process.env.JWT_SECRET);

      if (verify) {
        /* */

        /* Finding the id of the user in our database collection. */
        const isUser = await userModel.findById(id);

        /* Before updating the password of the user we will hashed the password of the user 
           using hashSync method of bcryptjs. 
        */
        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        /* Then we will update the password of the user with new-password using findByIdAndUpdate()
           mongoose method on basis of its id.
        */
        const isSuccess = await userModel.findByIdAndUpdate(isUser._id, {
          /* */

          /* What we will update */
          $set: {
            password: hashedPassword,
          },
        });

        /* If successfully updated then we will return a success response message. */
        if (isSuccess) {
          res.status(200).json({
            status: 200,
            message: "Password changes successfully",
          });
        }

        /* */
      } else {
        /* */

        res.status(200).json({
          status: 200,
          message: "Link has been expired",
        });

        /* */
      }

      /* */
    } else {
      return res
        .status(400)
        .json({ message: "Password and confirm password doesn't match." });
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};
