import express, { Request, Response } from 'express';
import cors from 'cors';

// 1. IMPORT THE ROUTER
import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';
import aiRouter from './routes/aiRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. MOUNT THE ROUTER (This is the missing link!)
// This tells the app: "If the URL starts with /api/v1/tours, send it to tourRouter"
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/ai', aiRouter);

// Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Natours API is live! 🌴');
});

export default app;