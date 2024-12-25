import express from "express";
import { body } from "express-validator";
import {
  addRatingToVideo,
  getAllCommentsById,
  getAverageRating,
  getVideoRatings,
} from "../Controllers/rating.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const ratingRouter = express.Router();

ratingRouter.post(
  "/rate/:videoId",
  authUser,
  [
    body("comment").notEmpty().withMessage("Comment cannot be empty!"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be positive in between 1 to 5!"),
  ],
  addRatingToVideo
);

ratingRouter.get("/video/:videoId", authUser, getVideoRatings);

ratingRouter.get("/video/:videoId/averageRating", authUser, getAverageRating);

ratingRouter.get("/video/:videoId/comments", authUser, getAllCommentsById);

export default ratingRouter;
