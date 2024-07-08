/* */

import { errorHandler } from "./errorHandler.js";

import JWT from "jsonwebtoken";

export const verifyJwtToken = (req, res, next) => {
  /* */

  // const authHeader = req.headers.authorization || req.headers.Authorization;

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return next(errorHandler(401, "Unauthorised User"));
  // }

  const cookies = req.headers.cookie;

  if (!cookies) {
    return next(
      errorHandler(
        401,
        "You have deleted your cookie. Please logout and login again"
      )
    );
  }

  const token = cookies.split("=")[1];

  JWT.verify(
    token, // String(token)
    process.env.ACCESS_TOKEN_JWT_SECRET,
    async (error, decodedData) => {
      /* */

      if (error) {
        res.clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });

        return next(errorHandler(403, "Forbidden : Invalid Token Id"));
      }

      req.user = decodedData;

      next();

      /* */
    }
  );

  /* */
};

export const verifyJwtTokens = (req, res, next) => {
  /* */

  // const authHeader = req.headers.authorization || req.headers.Authorization;

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return next(errorHandler(401, "Unauthorised User"));
  // }

  // const token = authHeader.split(" ")[1];

  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    /* */

    renewToken();

    /* */
  }

  JWT.verify(
    accessToken, // String(token)
    process.env.ACCESS_TOKEN_JWT_SECRET,
    async (error, decodedData) => {
      /* */

      if (error)
        return next(errorHandler(403, "Forbidden : Invalid Access Token Id"));

      req.user = decodedData;

      next();

      /* */
    }
  );

  /* */
};

const renewToken = (req, res, next) => {
  /* */

  let tokenExist = false;

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(errorHandler(403, "Token Expired"));
  }

  JWT.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_JWT_SECRET,
    async (error, decodedData) => {
      /* */

      if (error)
        return next(errorHandler(403, "Forbidden : Invalid Refresh Token"));

      const accessToken = JWT.sign(
        {
          userId: decodedData.id,
        },
        process.env.ACCESS_TOKEN_JWT_SECRET,
        { expiresIn: "30s" }
      );

      res.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 30000), // 4 hours
        httpOnly: true, // accessible only by the web server
        sameSite: "lax", // cross-site cookie
        path: "/",

        // secure: true // for https
        // maxAge: 7 * 24 * 60 * 60 * 1000, // expiry time
      });

      tokenExist = true;

      /* */
    }
  );

  return tokenExist;

  /* */
};
