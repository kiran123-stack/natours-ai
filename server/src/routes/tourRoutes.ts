import express from 'express';
import { 
  getAllTours, 
  createTour, 
  getTour, 
  updateTour, 
  deleteTour 
} from '../controllers/tourController';

const router = express.Router();

// 1. Root Route (for localhost:5000/api/v1/tours)
router
  .route('/')
  .get(getAllTours)
  .post(createTour);

// 2. ID Route (for localhost:5000/api/v1/tours/123)
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default router;