import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import clientRouter from './routes/client.route.js';
import cors from 'cors';

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON request body

// Database connection
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
        // Only start the server after successful database connection
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });

// Route definitions
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/client', clientRouter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack for debugging
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Don't exit the process in production, just log the error
    if (process.env.NODE_ENV === 'development') {
        process.exit(1);
    }
});