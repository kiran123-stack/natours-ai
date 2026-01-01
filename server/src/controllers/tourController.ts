import { Request, Response } from 'express';
import Tour from '../modals/tourModal';

// GET ALL TOURS
export const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};

// CREATE A TOUR
export const createTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: (err as Error).message, // Good for debugging
    });
  }
};

// ... existing imports and code ...

// 3. GET SINGLE TOUR (by ID)
export const getTour = async (req: Request, res: Response) => {
  try {
    // req.params.id comes from the URL (e.g., /api/v1/tours/5f4d...)
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      // If no tour found with that ID
      return res.status(404).json({
        status: 'fail',
        message: 'No tour found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};

// 4. UPDATE TOUR
export const updateTour = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,        // Return the modified document rather than the original
      runValidators: true // Validate the update operation against the model's schema
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};

// 5. DELETE TOUR
export const deleteTour = async (req: Request, res: Response) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    // 204 code means "No Content" (successfully deleted, sending nothing back)
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: (err as Error).message,
    });
  }
};