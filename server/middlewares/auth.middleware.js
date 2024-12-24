import jwt from "jsonwebtoken";
import UserModel from "../Models/user.model.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized!",
    });
  }
  const isBlackListed = await UserModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized!",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User Not Found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorized!",
    });
  }
};
