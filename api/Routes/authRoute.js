/* */

import express from "express";

const router = express.Router();

import {
  testController,
  SignUpController,
  SignInController,
  GoogleOauthController,
  SignOutController,
  ComplainMessageController,
  SendLinkController,
  ResetPasswordController,
} from "../Controllers/authController.js";

/* ******************************** 1: Testing the route ******************************** */

/* Creating a route(api endpoint) ie. /test and when this api endpoint will be call using axios 
   then the controller ie. testController will get execute and in this controller we have written 
   the logic to test our route.
*/
router.get("/test", testController);

/* ******************************** 2: Registering(SignUp) a new user ******************************** */

/* Creating a route(api endpoint) ie. /signUp and when this api endpoint will be call using 
   fetch/axios then the controller ie. SignUpController will get execute and inside this controller 
   we have written the logic how to register a new user.
*/
router.post("/signUp", SignUpController);

/* ******************************** 3. Logging a user(SignIn)  ******************************** */

/* Creating a route(api endpoint) ie. /signIn and when this api endpoint will be call using 
   fetch/axios then the controller ie. SignInController will get execute and inside this controller 
   we have written the logic how to SignIn a existing user.
*/
router.post("/signIn", SignInController);

/* ******************************** 4. SignIn with Google auth  ******************************** */

/* Creating a route(api endpoint) ie. /google and when this api endpoint will be call using 
   fetch/axios then the controller ie. googleOauthController will get execute and inside this controller 
   we have written the logic how to signIn a user using google Oauth.
*/
router.post("/google", GoogleOauthController);

/* ******************************** 5. Signing Out a user(SignOut) ******************************** */

/* Creating a route(api endpoint) ie. /signOut and when this api endpoint will be call using 
   fetch/axios then the controller ie. signOutController will get execute and inside this controller 
   we have written the logic to signOut an existing logged in user.
*/
router.get("/signOut", SignOutController);

/* ******************************** 6: To store complaints of the user ******************************** */

/* Creating a route(api endpoint) ie. /contact and when this api endpoint will be call using 
   fetch/axios then the controller ie.  ComplainMessageController will get execute and inside this controller 
   we have written the logic how to submit the details of the complaint form in the contact-page.
*/
router.post("/contact", ComplainMessageController);

/* *******************************  7: To send link to the email  **************************** */

/* Creating a route(api endpoint) ie. /send-link and when this api endpoint will be call using 
   fetch/axios then the controller ie.  SendLinkController will get execute and inside this controller 
   we have written the logic how to send an link to the user's email-id to reset the password.
*/
router.post("/send-link", SendLinkController);

/* *******************************  8: To reset password of the user *************************** */

/* Creating a route(api endpoint) ie. /reset-password/:id/:token and when this api endpoint will be 
   call using fetch/axios then the controller ie.  ResetPasswordController will get execute and inside 
   this controller we have written the logic how to reset and update the password of the user. 
*/

router.post("/reset-password/:id/:token", ResetPasswordController);

export default router;
