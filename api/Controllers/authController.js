/* */

import userModel from "../Models/userModel.js";

import contactModel from "../Models/contactModel.js";

import bcryptjs from "bcryptjs";

import JWT from "jsonwebtoken";

import crypto from "crypto";

import { SendResetPasswordEmail } from "./emailController.js";

import { SendVerifyEmail } from "./emailController.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

import { generateTokens } from "../Utils/generateTokens.js";

/********************************************************************************************** */
/*******************************   1 : Testing Controller   *********************************** */
/********************************************************************************************** */

export const testController = (req, res) => {
  res.json({
    message: "Running successsfully the test Route.",
  });
};

/*********************************************************************************************** */
/***************************      2 : Creating SignUp Controller      ************************** */
/*********************************************************************************************** */

export const SignUpController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const validEmail = await userModel.findOne({
      email: req.body.email,
    });

    if (validEmail) {
      /* */

      const verifiedEmail = validEmail.emailVerified;

      if (verifiedEmail === true) {
        return next(
          errorHandler(401, "An account with this email already exist.")
        );
      }

      return;

      /* */
    }

    if (validEmail) {
      /* */

      const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

      const updatedUserInfo = await userModel.findOneAndUpdate(
        /* */

        { email },

        { ...req.body, password: hashedPassword },

        { new: true }

        /* */
      );

      const { password: pass, ...remainingUserDetails } = updatedUserInfo._doc;

      res.status(200).json(remainingUserDetails);

      /* */
    } else {
      /* */

      /* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
      const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);

      /* Then we will create the new-user and save it. */
      const newUser = await new userModel({
        ...req.body,
        password: hashedPassword,
      }).save();

      const { password: pass, ...remainingUserDetails } = newUser._doc;

      res.status(200).json(remainingUserDetails);

      /* */
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************ */
/*****************************    3 : Creating SignIn Controller     **************************** */
/************************************************************************************************ */

export const SignInController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email, password } = req.body;

    const validUser = await userModel.findOne({ email });

    const validEmail = await userModel.findOne({ email });

    if (!validEmail) {
      return next(errorHandler(404, "User not Registered! Please Register"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Wrong Password"));
    }

    if (validEmail) {
      /* */

      // var verifiedPhoneNumber = validEmail.phoneVerified;

      // if (verifiedEmail === false && verifiedPhoneNumber === false) {
      //   return next(
      //     errorHandler(
      //       401,
      //       "You have not verified your email and phone number. Please verify !"
      //     )
      //   );
      // }

      // if (verifiedPhoneNumber === false) {
      //   return next(
      //     errorHandler(
      //       401,
      //       "You have not verified your phone number. Please verify !"
      //     )
      //   );
      // }

      var verifiedEmail = validEmail.emailVerified;

      if (verifiedEmail === false) {
        return next(
          errorHandler(401, "You have not verified your email. Please verify !")
        );
      }

      /* */
    }

    await generateTokens(res, validUser);

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************ */
/**************************       4 : Creating google-Oauth Controller     ********************** */
/************************************************************************************************ */

export const GoogleOauthController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* When user's email exists in our database then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.     


       If user's email doesn't exist in our database then we will create a new user and save it.

          To create a user we have to ----

         * generate a random password.
         * then we will hashed that password.
         * then we will create that new user and save it.
         * create a token.
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
    */

    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      /* */

      await generateTokens(res, existingUser);

      /* */
    } else {
      /* */

      /* Generating a random password because in our model we gave password field as required and 
         if we donot provide a password then we will get an error.
         By signing up with google we don't actually get a password from google.
         Therefore we will generate a random password for the user and whenever the user wants 
         to update the password they can update their password.

         We are creating a unique password of 16 characters. 8 + 8 
         Using Math.random() we are generating a number and converting the number to string 
         Here. 36 means numbers from 0 to 9 and also letters from a-z ie. it will form a password
         with random numbers and letters together and we will take only the last eight digits from 
         both the generated string (password) and formed a 16 digit characters.

      */

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

      /* Then we will create the new-user and save it. */
      const newUser = new userModel({
        /* */

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.photo,
        password: hashedPassword,
        emailVerified: true,

        /* */
      });
      await newUser.save();

      await generateTokens(res, newUser);

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************ */
/*****************************    5 : Creating SignOut Controller     *************************** */
/************************************************************************************************ */

export const SignOutController = async (req, res, next) => {
  /* */

  try {
    /* */

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",

      // secure: false, // for http
      // sameSite: "lax", // cross-site cookie for http
    });

    res.status(200).json("User has been logged Out!");

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************ */
/**************************     6 : Creating Controller for Complain-messages  ****************** */
/************************************************************************************************ */

export const ComplainMessageController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { firstName, lastName, email, phoneNumber, message, id } = req.body;

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return next(errorHandler(404, "Please login to sent us a message"));
    }

    /* Then we will create the new-user and save it. */
    const newUser = new contactModel({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,

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

/************************************************************************************************ */
/**************************     7 : Creating Controller for sending link  *********************** */
/************************************************************************************************ */

export const SendLinkController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return next(errorHandler(404, "User doesn't exist"));
    }

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    const url = `${process.env.BASE_URL}/reset-password/${existingUser._id}/${token}`;

    SendResetPasswordEmail({
      email: existingUser.email,
      subject: "Password change request link received",
      message: url,
      html: `
      <p>Please click on the following link to reset your password:</p>
       <a href= "${url}"> Reset Password </a>
      `,
    });

    res.status(200).json({
      status: "success",
      message: "Password reset link has been send to your email.",
    });

    /* */

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************************************************ */
/**************************     8 : Creating Controller to reset-password  ********************** */
/************************************************************************************************ */

export const ResetPasswordController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { newPassword, confirmPassword } = req.body;

    const { id, token } = req.params;

    const existingUser = await userModel.findOne({ _id: id });

    if (!existingUser) {
      return next(errorHandler(404, "User doesn't exist"));
    }

    /*   If the user's id exist in our database then we will check the password and the 
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

      const verify = await JWT.verify(token, process.env.JWT_SECRET);

      if (verify) {
        /* */

        const isUser = await userModel.findById(id);

        const hashedPassword = bcryptjs.hashSync(newPassword, 10);

        const isSuccess = await userModel.findByIdAndUpdate(isUser._id, {
          /* */

          /* What we will update */
          $set: {
            password: hashedPassword,
          },

          /* */
        });

        if (isSuccess) {
          res.status(200).json({
            status: 200,
            message: "Password changed successfully",
          });
        }

        /* */
      } else {
        /* */

        res.status(200).json({
          status: 200,
          message: "Password reset link has been expired",
        });

        /* */
      }

      /* */
    } else {
      /* */

      return res
        .status(400)
        .json({ message: "Password and confirm password doesn't match." });

      /* */
    }

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const SendVerificationEmailController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { email } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      /* */

      if (existingUser.emailVerified === true) {
        /* */

        return next(
          errorHandler(404, "This email is verified with another account!")
        );

        /* */
      } else {
        /* */

        const token = crypto.randomBytes(32).toString("hex");

        const url = `${process.env.BASE_URL}/verify-email/${existingUser._id}/${token}/${email}`;

        await SendVerifyEmail({
          email: email,
          subject: "Verify Email",
          message: url,
          html: `
          <p> Please click on the following link to verify your email: </p>
          <a href= "${url}"> Verify My Email Id </a>
    
          `,
        });

        res
          .status(200)
          .json({ message: "Verification mail send successfully" });

        /* */
      }

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const VerifyEmailController = async (req, res, next) => {
  /* */

  try {
    /* */

    const existingUser = await userModel.findOne({
      _id: req.params.userId,
    });

    if (!existingUser) {
      return next(errorHandler(404, "User does not exist"));
    }

    if (existingUser) {
      /* */

      const updatedUserInfo = await userModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.userId,

        {
          $set: {
            emailVerified: true,
            email: req.params.email,
          },
        },

        { new: true }

        /* */
      );

      if (!updatedUserInfo) {
        res.status(400).json({
          status: "false",
          message: "Email verification failed",
        });
      }

      await generateTokens(res, updatedUserInfo);

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

export const RefreshTokenController = async (req, res, next) => {
  /* */

  const cookies = req.headers.cookie;

  const previousToken = cookies.split("=")[1];

  if (!previousToken) {
    return next(errorHandler(401, "Unauthorized User: Token expired"));
  }

  JWT.verify(
    previousToken,
    process.env.ACCESS_TOKEN_JWT_SECRET,
    async (error, decodedData) => {
      /* */

      if (error) return next(errorHandler(403, "Authentication Failed"));

      res.clearCookie("refreshToken");

      req.cookies["refreshToken"] = "";

      const newAccessToken = JWT.sign(
        {
          userId: decodedData.id,
        },
        process.env.ACCESS_TOKEN_JWT_SECRET,
        { expiresIn: "4h" }
      );

      res.cookie("accessToken", newAccessToken, {
        expires: new Date(Date.now() + 3600 * 4), // 4 hours
        httpOnly: true, // accessible only by the web server
        sameSite: "lax", // cross-site cookie
        path: "/",

        // secure: true // for https
        // maxAge: 7 * 24 * 60 * 60 * 1000, // expiry time
      });

      req.user = decodedData;

      next();

      // const foundUser = await userModel.findOne({ _id: decodedData.id });

      // if (!foundUser)
      //   return next(errorHandler(401, "Unauthorised User. User not found"));

      // const { password: pass, ...remainingUserDetails } = foundUser._doc;

      // res
      //   .status(200)
      //   .json({ user: remainingUserDetails, token: newAccessToken });

      /* */
    }
  );

  /* */
};
