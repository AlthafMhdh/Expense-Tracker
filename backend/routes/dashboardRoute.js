// const express = require("express");
// const {protect} = require("../middleware/authMiddleware");

// const { getDashboardData } = require("../controllers/dashboardController");
// const router = express.Router();

// router.get("/", protect, getDashboardData);

// module.exports = router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";
const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
