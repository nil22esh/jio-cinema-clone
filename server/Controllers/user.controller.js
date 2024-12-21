import { validationResult } from "express-validator";
import { createUser } from "../Repository/user.repository.js";

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { username, email, password, profilePicture, role } = req.body;
  const user = await createUser({
    username,
    email,
    password,
    profilePicture,
    role,
  });
  const token = user.generateJwtToken();
  res.status(201).json({
    success: true,
    msg: "User Registration Successful!",
    user: user,
    JwtToken: token,
  });
};

export const signIn = (req, res, next) => {};

export const signOut = (req, res, next) => {};

export const getUserProfile = (req, res, next) => {};

export const updateUserProfile = (req, res, next) => {};
