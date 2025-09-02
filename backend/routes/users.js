import express from 'express';
import { getSingleUser, updateUser } from '../controllers/userController.js';
import { deleteTour, getAllTour} from '../controllers/tourController.js';
const router = express.Router();

import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';

router.put('/:id',verifyUser, updateUser);


router.delete('/:id',verifyUser, deleteTour);

router.get('/', verifyAdmin, getAllTour);

router.get('/:id',verifyUser, getSingleUser);

export default router;