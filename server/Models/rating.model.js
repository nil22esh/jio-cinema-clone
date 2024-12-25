import mongoose from "mongoose";

const ratingModel = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoModel",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const RatingModel = mongoose.model("RatingModel", ratingModel);

export default RatingModel;
