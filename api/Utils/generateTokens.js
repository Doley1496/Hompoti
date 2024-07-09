/* */

import JWT from "jsonwebtoken";

export const generateTokens = async (res, user) => {
  /* */

  try {
    /* */

    const accessToken = JWT.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 86400 * 1000), // 1 Day
      httpOnly: true, // accessible only by the web server
      path: "/",

      secure: true, // for https
      sameSite: "none", // cross-site cookie for https
    });

    // const refreshToken = JWT.sign(
    //   {
    //     userId: user._id,
    //   },
    //   process.env.REFRESH_TOKEN_JWT_SECRET,
    //   { expiresIn: "1m" }
    // );

    // res.cookie("refreshToken", refreshToken, {
    //   expires: new Date(Date.now() + 60000), // 1minute
    //   httpOnly: true, // accessible only by the web server
    //   sameSite: "lax", // cross-site cookie for http
    //   path: "/",

    //   //  sameSite: "lax", // cross-site cookie for http
    //   //  sameSite: "none", // cross-site cookie for https
    //   //  secure: true // for https
    //   //  maxAge: 7 * 24 * 60 * 60 * 1000, // expiry time

    //   // 1 Day = 86400 * 1000
    //   // 1 hour = 3600 * 1000

    // });

    const { password: pass, ...remainingUserDetails } = user._doc;

    res.status(200).json({ user: remainingUserDetails, token: accessToken });

    /* */
  } catch (error) {
    /* */

    console.log(error);

    /* */
  }

  /* */
};
