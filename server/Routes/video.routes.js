import express from "express";
import { body } from "express-validator";
import {
  addNewVideo,
  deleteVideo,
  getAllVideos,
  getVideoById,
  getVideosByUserId,
  updateVideo,
} from "../Controllers/video.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { isAdminCheck } from "../middlewares/isAdmin.middleware.js";

const videoRouter = express.Router();

videoRouter.post(
  "/addVideo",
  authUser,
  isAdminCheck,
  [
    body("title").notEmpty().withMessage("Please Enter The Title!"),
    body("description").notEmpty().withMessage("Please Enter The Description!"),
    body("genre")
      .isArray({ min: 1 })
      .withMessage("Genre must be an array with at least one item"),
    body("releaseDate")
      .isISO8601()
      .withMessage("Release date must be a valid date"),
    body("duration")
      .isInt({ min: 1 })
      .withMessage("Duration must be a positive integer"),
    body("thumbnail").notEmpty().withMessage("Please Enter The Thumbnail!"),
    body("videoUrl").notEmpty().withMessage("Please Enter The Video Url!"),
    body("languages")
      .isIn([
        "Hindi",
        "English",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Kannada",
        "Bengali",
      ])
      .withMessage("Invalid Language!"),
    body("category")
      .isIn(["Movie", "Series", "Short Film"])
      .withMessage("Invalid Category!"),
  ],
  addNewVideo
);

videoRouter.get("/allVideos", authUser, getAllVideos);

videoRouter.put("/updadteVideo/:id", authUser, isAdminCheck, updateVideo);

videoRouter.get("/video/:id", authUser, getVideoById);

videoRouter.delete("/video/:id", authUser, isAdminCheck, deleteVideo);

videoRouter.get("/myVideos", authUser, isAdminCheck, getVideosByUserId);

export default videoRouter;
