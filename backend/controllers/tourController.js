// controllers/tourController.js
import Tour from "../models/Tour.js";

// ================== CREATE ==================
export const createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
      error: err.message,
    });
  }
};

// ================== UPDATE ==================
export const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      error: err.message,
    });
  }
};

// ================== DELETE ==================
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: err.message,
    });
  }
};

// ================== GET SINGLE ==================
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate({
      path: "reviews",
      select: "username reviewText rating createdAt",
    });

    if (!tour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour fetched successfully",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour",
      error: err.message,
    });
  }
};

// ================== GET ALL (with Pagination) ==================

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(); // returns ALL (featured + non-featured)

    res.status(200).json({
      success: true,
      data: tours
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch tours" });
  }
};

// ================== SEARCH ==================
export const getTourBySearch = async (req, res) => {
  const city = req.query.city ? new RegExp(req.query.city, "i") : null;
  const distance = req.query.distance ? parseInt(req.query.distance) : 0;
  const maxGroupSize = req.query.maxGroupSize
    ? parseInt(req.query.maxGroupSize)
    : 0;

  try {
    let query = {};

    if (city) query.city = city;
    if (distance) query.distance = { $gte: distance };
    if (maxGroupSize) query.maxGroupSize = { $gte: maxGroupSize };

    const tours = await Tour.find(query).populate({
      path: "reviews",
      select: "username reviewText rating createdAt",
    });

    res.status(200).json({
      success: true,
      message: "Tours fetched successfully",
      data: tours,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Search failed",
      error: err.message,
    });
  }
};

// ================== FEATURED ==================
export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(8); 

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Featured tours fetched successfully",
      data: tours,
    });
  } catch (err) {
    console.error("❌ getFeaturedTour error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured tours",
      error: err.message,
    });
  }
};




// ================== COUNT ==================
export const getTourCounts = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, data: tourCount });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch tour count" });
  }
};


// For backward compatibility
export { getAllTours as getAllTour };
