import express from "express";
import { body } from "express-validator";
import { signUp } from "../Controllers/user.controller.js";

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

export default userRouter;
