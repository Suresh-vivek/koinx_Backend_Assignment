import express from "express";

import { getCryptoStats , getStandardDeviation } from "../controllers/crypto.controller.js";

const router = express.Router();

// route for fetching cryptocurrency status
router.get("/stats", getCryptoStats);
router.get("/deviation" , getStandardDeviation);

export default router;
