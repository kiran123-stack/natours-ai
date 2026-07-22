import express, { Request, Response } from 'express';
import cors from 'cors';

// 1. IMPORT THE ROUTER
import tourRouter from './routes/tourRoutes';
import userRouter from './routes/userRoutes';
import aiRouter from './routes/aiRoutes';

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000', // Next.js local
  'http://localhost:5173', // Vite local (if you use it)
  'https://natours-ai.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no Origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      // Allow localhost and all Vercel deployments (including preview URLs)
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
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
