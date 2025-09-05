import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 8000;

// ✅ Fix: Allow both localhost and deployed frontend
const corsOption = {
  origin: [
    "http://localhost:3000",
    "https://voyagevista-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

// Database connection
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB database connected");
  } catch (err) {
    console.log("❌ MongoDB database connection failed", err.message);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Server start
app.listen(port, () => {
  connect();
  console.log(`🚀 Server listening on port ${port}`);
});
