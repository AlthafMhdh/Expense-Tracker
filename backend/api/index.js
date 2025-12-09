// import express from "express";
// import serverless from "serverless-http";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import 'dotenv/config'; 

// import connectDB from "../config/db.js";
// import authRoutes from "../routes/authRoutes.js";
// import incomeRoutes from "../routes/incomeRoutes.js";
// import expenseRoutes from "../routes/expenseRoutes.js";
// import dashboardRoutes from "../routes/dashboardRoute.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connectDB();

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// // --- STATIC UPLOAD FOLDER ---
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// export const handler = serverless(app);


import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import 'dotenv/config';

import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import incomeRoutes from "../routes/incomeRoutes.js";
import expenseRoutes from "../routes/expenseRoutes.js";
import dashboardRoutes from "../routes/dashboardRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- STATIC UPLOAD FOLDER ---
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- ROUTES ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// --- SERVERLESS HANDLER ---
let cachedHandler;

export const handler = async (event, context) => {
  // Connect to DB before handling requests
  await connectDB();

  // Cache the serverless handler to avoid re-wrapping every request
  if (!cachedHandler) cachedHandler = serverless(app);

  return cachedHandler(event, context);
};

