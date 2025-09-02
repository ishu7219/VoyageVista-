import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // Reference to Tour model
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// ✅ Avoid OverwriteModelError
const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
