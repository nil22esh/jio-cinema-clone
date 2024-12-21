import { validationResult } from "express-validator";
import { createUser } from "../Repository/user.repository.js";
import UserModel from "../Models/user.model.js";
import BlackListModel from "../Models/blackList.model.js";

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

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({
      success: false,
      msg: "Invalid Email or Password!",
    });
  }
  const isMatched = await user.comparePassword(password);
  if (!isMatched) {
    return res.status(401).json({
      success: false,
      msg: "Invalid Email or Password!",
    });
  }
  const token = user.generateJwtToken();
  res.cookie("token", token);
  res.status(200).json({
    success: true,
    msg: "User Logged In Successfully!",
    user: user,
    jwtToken: token,
  });
};

export const signOut = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlackListModel.create({ token });
  res.status(200).json({
    success: true,
    msg: "User Logged Out Successfully!",
  });
};

export const getUserProfile = async (req, res, next) => {
  const { id } = req.user;
  const user = await UserModel.findById(id);
  res.status(200).json({
    success: true,
    user: user,
  });
};

export const updateUserProfile = async (req, res, next) => {};
