import mongoose from "mongoose";
import VideoModel from "../Models/video.model.js";

export const createVideo = async ({
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
}) => {
  if (
    !title ||
    !description ||
    !genre ||
    !releaseDate ||
    !duration ||
    !thumbnail ||
    !videoUrl ||
    !languages ||
    !category ||
    !createdBy
  ) {
    throw new Error("Please fill all the required fields!");
  }
  try {
    const video = await VideoModel.create({
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
    });
    return video;
  } catch (error) {
    throw new Error(`CreateVideo Error: ${error}`);
  }
};

export const allVideos = async () => {
  try {
    const allVideos = await VideoModel.find();
    return allVideos;
  } catch (error) {
    throw new Error(`GetAllVideos Error: ${error}`);
  }
};

export const updateVideoById = async (videoData) => {
  try {
    const updatedVideo = await VideoModel.updateOne(videoData);
    return updatedVideo;
  } catch (error) {
    throw new Error(`UpdateVideo Error: ${error}`);
  }
};
