import dotenv from 'dotenv';
// 1. Load Environment Variables (Must be at the very top)
dotenv.config();

import app from './app';        // Import the app we just created
import connectDB from './config/db'; // Import database connection

const PORT = process.env.PORT || 5000;

// 2. Connect to Database
connectDB();

// 3. Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});