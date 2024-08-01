import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import router from './routes/index';

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies to be sent and received
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Test endpoint
app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "test!" });
});

// API routes
app.use('/api', router);

// Start the server
app.listen(7000, () => {
  console.log("Server started on localhost:7000");
});
