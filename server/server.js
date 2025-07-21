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
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.options('*', cors())

//API endpoints
app.get("/", (req, res) => {
  res.send("API WORKING");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));

// Export the app for Vercel serverless deployment
export default app;
