import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import clientRouter from './routes/client.route.js';
import cors from 'cors';

const app = express();

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request body

// Database connection
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log(err));

// Route definitions
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/client', clientRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
