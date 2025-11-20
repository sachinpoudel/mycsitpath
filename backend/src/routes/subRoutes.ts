import { Router } from "express";
import express from "express";
import { createSub, getAllSubs } from "../controller/subController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/subjects', authMiddleware, getAllSubs)
router.post('/subjects', authMiddleware, createSub )

export default router