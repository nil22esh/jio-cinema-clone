import { validationResult } from "express-validator";
import {
  allVideos,
  createVideo,
  updateVideoById,
} from "../Repository/video.repository.js";
import VideoModel from "../Models/video.model.js";
import UserModel from "../Models/user.model.js";

export const addNewVideo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const {
    title,
    description,
    genre,
    releaseDate,
    duration,
    thumbnail,
    videoUrl,
    cast,
    languages,
    category,
    createdBy = req.user._id,
  } = req.body;
  const newVideo = await createVideo({
    title,
    description,
    genre,
    releaseDate,
    duration,
    thumbnail,
    videoUrl,
    cast,
    languages,
    category,
    createdBy,
    rating: { average: 0, totalRatings: 0, users: [] },
  });
  res.status(201).json({
    success: true,
    msg: "Video Created Successfully!",
    video: newVideo,
  });
};

export const getAllVideos = async (req, res, next) => {
  const videos = await allVideos();
  res.status(200).json({
    success: true,
    msg: "All Videos Fetched Successfully!",
    count: `${videos.length} videos`,
    videos: videos,
  });
};

export const getVideoById = async (req, res, next) => {
  const { id } = req.params;
  const video = await VideoModel.findById(id);
  if (!video) {
    return res.status(400).json({
      success: false,
      msg: "Video with this id not found!",
    });
  }
  res.status(200).json({
    success: true,
    msg: "Video Fetched Successfully!",
    video: video,
  });
};

export const updateVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await VideoModel.findById(id);
  if (!video) {
    return res.status(400).json({
      success: false,
      msg: "Video with this id not found!",
    });
  }
  const updatedVideo = await updateVideoById(req.body);
  res.status(200).json({
    success: true,
    msg: "Video Updated Successfully",
    video: updatedVideo,
  });
};

export const deleteVideo = async (req, res, next) => {
  const { id } = req.params;
  const video = await VideoModel.findByIdAndDelete(id);
  if (!video) {
    return res.status(400).json({
      success: false,
      msg: "Video with this id not found!",
    });
  }
  res.status(200).json({
    success: true,
    msg: "Video Deleted Successfully",
  });
};

export const getVideosByUserId = async (req, res, next) => {
  const { id } = req.user;
  if (!id) {
    return res.status(400).json({
      success: false,
      msg: "User Not Found!",
    });
  }
  const isUser = await UserModel.findById(id);
  if (!isUser) {
    return res.status(400).json({
      success: false,
      msg: "User With This ID Not Found!",
    });
  }
  const videos = await VideoModel.find({ createdBy: id });
  res.status(200).json({
    success: true,
    msg: "Videos Fetched Successfully!",
    count: `${videos.length} videos`,
    videos: videos,
  });
};
