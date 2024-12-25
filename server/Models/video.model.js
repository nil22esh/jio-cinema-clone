import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
      default: [],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Documentary",
      ],
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
      users: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
          rate: { type: Number, min: 1, max: 5 },
        },
      ],
    },
    views: {
      type: Number,
      default: 0,
    },
    cast: {
      type: [String],
      default: [],
    },
    languages: {
      type: String,
      required: true,
      enum: [
        "Hindi",
        "Marathi",
        "English",
        "Punjabi",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Kannada",
        "Bengali",
      ],
    },
    category: {
      type: String,
      required: true,
      enum: ["Movie", "Series", "Short-Film"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const VideoModel = mongoose.model("VideoModel", videoSchema);

export default VideoModel;
