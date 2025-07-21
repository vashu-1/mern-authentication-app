import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  "https://mern-authentication-app-1-o77z.onrender.com",
  "https://mern-authentication-app-uhjm.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(express.json()); // will allow to convert data in json format{data sent from frontend to backend in json format} to javascript object in order to use it in your code
app.use(cookieParser());

// Simple and reliable CORS setup
app.use(
  cors({
    origin: [
      "https://mern-authentication-app-1-o77z.onrender.com",
      "https://mern-authentication-app-uhjm.onrender.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// Add middleware to set CORS headers manually as backup
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie, Set-Cookie"
  );
  res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

//API endpoints
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// Test CORS endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));

// Export the app for Vercel serverless deployment
export default app;
