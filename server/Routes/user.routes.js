import express from "express";
import { body } from "express-validator";
import {
  getUserProfile,
  signIn,
  signOut,
  signUp,
} from "../Controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required!"),
    body("email").isEmail().withMessage("Invalid email format!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signUp
);

userRouter.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Please Enter A Valid Email!"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signIn
);

userRouter.get("/profile", authUser, getUserProfile);

userRouter.get("/signout", authUser, signOut);

export default userRouter;
