import RatingModel from "../Models/rating.model.js";
import VideoModel from "../Models/video.model.js";

export const addRatingToVideo = async (req, res, next) => {
  const { videoId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user._id;
  try {
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        msg: "Video not found",
      });
    }
    if (!video.rating || typeof video.rating !== "object") {
      video.rating = { average: 0, totalRatings: 0, users: [] };
    }
    const existingRatingIndex = video.rating.users.findIndex(
      (userRating) => userRating.userId.toString() === userId.toString()
    );
    if (existingRatingIndex !== -1) {
      video.rating.users[existingRatingIndex].rate = rating;
    } else {
      video.rating.users.push({ userId, rate: rating });
    }
    const totalRatings = video.rating.users.length;
    const average =
      video.rating.users.reduce((acc, curr) => acc + curr.rate, 0) /
      totalRatings;
    video.rating.totalRatings = totalRatings;
    video.rating.average = average;
    await video.save();
    const newRating = await RatingModel.create({
      comment,
      rating,
      userId,
      videoId,
    });
    res.status(200).json({
      success: true,
      msg: "Rating added successfully",
      rating: newRating,
      video: video.rating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Error rating: ${error.message}`,
    });
  }
};

export const getVideoRatings = async (req, res, next) => {
  const { videoId } = req.params;
  const video = await VideoModel.findById(videoId);
  if (!video) {
    return res.status(404).json({
      success: false,
      msg: "Video not found",
    });
  }
  const videoRatings = await RatingModel.find({ videoId: videoId });
  res.status(200).json({
    success: true,
    msg: "Ratings retrieved successfully!",
    count: `${videoRatings.length} ratings`,
    ratings: videoRatings,
  });
};

export const getAverageRating = async (req, res, next) => {
  const { videoId } = req.params;
  const video = await VideoModel.findById(videoId);
  if (!video) {
    return res.status(404).json({
      success: false,
      msg: "Video not found",
    });
  }
  res.status(200).json({
    success: true,
    msg: "Average rating retrieved successfully!",
    averageRating: video.rating.average,
  });
};

export const getAllCommentsById = async (req, res, next) => {
  const { videoId } = req.params;
  const video = await VideoModel.findById(videoId);
  if (!video) {
    return res.status(404).json({
      success: false,
      msg: "Video not found",
    });
  }
  const videoRatings = await RatingModel.find({ videoId: videoId });
  const comments = videoRatings.map((rating) => rating.comment);
  res.status(200).json({
    success: true,
    msg: "Comments retrieved successfully!",
    count: `${comments.length} comments`,
    comments: comments,
  });
};
