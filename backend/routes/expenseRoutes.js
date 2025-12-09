// const express = require("express");
// const {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} = require("../controllers/expenseController");
// const router = express.Router();
// const {protect} = require("../middleware/authMiddleware");

// router.post("/add", protect, addExpense);
// router.get("/get", protect, getAllExpense);
// router.get("/downloadExcel", protect, downloadExpenseExcel);
// router.delete("/:id", protect, deleteExpense);

// module.exports = router;

import express from "express";
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel
} from "../controllers/expenseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

export default router;
