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

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// --- STATIC UPLOAD FOLDER ---
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export const handler = serverless(app);


// api/index.js
// import express from "express";
// import serverless from "serverless-http";
// import connectDB from "../config/db.js";

// // Load environment variables locally
// import 'dotenv/config'; // only needed for local development

// const app = express();
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.json({ message: "ExpenseTracker API is working" });
// });

// // Example route
// app.get("/expenses", async (req, res) => {
//   res.json({ expenses: [] });
// });

// // Connect to MongoDB before exporting
// await connectDB();

// // Export wrapped with serverless
// export default serverless(app);
