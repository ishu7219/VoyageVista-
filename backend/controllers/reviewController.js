// backend/controllers/reviewController.js
import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

// ✅ Create review
export const createReview = async (req, res) => {
  const tourId = req.params.tourId;

  if (!req.user) {
    return res.status(401).json({ success: false, message: "You're not authenticated" });
  }

  const { username, reviewText, rating } = req.body;

  try {
    const newReview = new Review({
      tour: tourId,
      user: req.user.id,
      username,
      reviewText,
      rating,
    });

    await newReview.save();

    // Optional: add review to Tour document
    await Tour.findByIdAndUpdate(tourId, { $push: { reviews: newReview._id } });

    res.status(201).json({ success: true, message: "Review submitted successfully", review: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.tourId });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
