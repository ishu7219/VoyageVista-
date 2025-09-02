import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingController.js";

const router = express.Router();

// ✅ create new booking
router.post("/",  createBooking);

// ✅ get single booking by ID
router.get("/:id", getBooking);

// ✅ get all bookings
router.get("/", getAllBooking);

export default router;
