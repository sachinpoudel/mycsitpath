import { Router } from "express";
import express from "express";
import { createSub, getAllSubs, getSubBySemester } from "../controller/subController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/subjects', authMiddleware, getAllSubs)
router.post('/subjects', authMiddleware, createSub )
router.post('/subjects/by-semester', authMiddleware, getSubBySemester )

export default router