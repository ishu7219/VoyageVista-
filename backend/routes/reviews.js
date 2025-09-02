import express from "express";
import { createReview, getReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../utils/verifyToken.js"; // only verify token, not userId

const router = express.Router();

// ✅ Routes
router.post("/:tourId", verifyToken, createReview);
router.get("/:tourId", getReviews);

export default router;
