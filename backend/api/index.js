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


// api/index.js
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

// --- Middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use("/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// --- STATIC UPLOAD FOLDER ---
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- Test Route ---
app.get("/", (req, res) => {
  res.json({ message: "ExpenseTracker API is working" });
  console.log("ExpenseTracker API is working");
});

// --- Connect to MongoDB ---
await connectDB();

// --- Export wrapped with serverless ---
//export default serverless(app);
export const handler = serverless(app);
export default handler;

// app.listen(process.env.PORT || 8000, () => {
//   console.log(`Server running on port ${process.env.PORT || 8000}`);
// });