import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import schemeRouter from "./routes/schemeRoutes.js";
import hospitalRouter from "./routes/hospitalRoutes.js"; // <-- Add this line

const app = express();

const port = process.env.PORT || 4000;
connectDb();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//API endPoints
app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/schemes", schemeRouter);
app.use("/api/hospitals", hospitalRouter); // <-- Add this line

app.listen(port, () => console.log(`Server running on the port ${port}`));
