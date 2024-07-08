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
  SendVerificationEmailController,
  VerifyEmailController,
  RefreshTokenController,
} from "../Controllers/authController.js";

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

router.get("/test", testController);

router.post("/signUp", SignUpController);

router.post("/signIn", SignInController);

router.post("/google", GoogleOauthController);

router.get("/signOut", SignOutController);

router.get("/refreshToken", RefreshTokenController, verifyJwtToken);

router.post("/contact", ComplainMessageController);

router.post("/send-link", SendLinkController);

router.post("/reset-password/:id/:token", ResetPasswordController);

router.post("/send-email", SendVerificationEmailController);

router.get("/verify-email/:userId/:token/:email", VerifyEmailController);

export default router;
