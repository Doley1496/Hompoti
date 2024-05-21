/* */

import { errorHandler } from "./errorHandler.js";

import JWT from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  /* */

  /*  We will get the token from the cookie and we directly cannot get any data from the cookie.
      So in-order to get any data from the cookie we need to install a package call cookie-parser in the 
      api side. 
  */

  /* Getting the token from the cookie using cookie-parser. Inside the cookie we have provided the name 
     of the token as access_token so we will use access_token as the token name. 
  */
  const token = req.cookies.access_token;

  /* After we get the token we will verify it. */

  /* If we don't get any token ie. if there is no token then we will just return an error by passing the 
     middleware function errorHandler() that we created in errorHandler.js with a statusCode of 401 and 
     message as "Unauthorised User" inside the next() function. 
  */
  if (!token) {
    return next(errorHandler(401, "Unauthorised User"));
  }

  /* If there is a token we will check(verify) the token is correct or not using json-web-token. */

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    /* */

    /* If there is an error we will return an error by passing the middleware function errorHandler() that we 
       created in errorHandler.js with a statusCode of 403 and message as "Forbiddden" inside the next() function. 
    */
    if (err) return next(errorHandler(403, "Forbidden"));

    /* If there is no error we will save the user to the request and send this user to the controller to 
       update the user. 
    */
    req.user = user;

    /* After saving the user we will go to the next function and execute it.
       ie.. we are sending this user to the updateProfileController to update the user. 
    */
    next();
  });
};
