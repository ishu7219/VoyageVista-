import express from 'express';
import { 
  createTour, 
  getAllTour, 
  getSingleTour, 
  updateTour, 
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCounts
} from '../controllers/tourController.js';

import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE a tour (Admin only)
router.post('/', verifyAdmin, createTour);

// UPDATE a tour by ID (Admin only)
router.put('/:id', verifyAdmin, updateTour);

// DELETE a tour by ID (Admin only)
router.delete('/:id', verifyAdmin, deleteTour);

// 🔍 SEARCH ROUTES (keep these BEFORE "/:id")
router.get('/search/getTourBySearch', getTourBySearch);
router.get('/search/getFeaturedTour', getFeaturedTour);
router.get('/search/getTourCount', getTourCounts);

// 📌 NORMAL ROUTES
router.get('/', getAllTour);
router.get('/:id', getSingleTour);

export default router;

