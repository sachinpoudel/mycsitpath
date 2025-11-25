import { Router } from "express";
import express from "express";
import { createSem, deleteSemester, getSem, getSemById } from "../controller/semController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/semesters', getSem)
router.post('/semesters', authMiddleware, createSem)
router.delete('/semesters/:id', authMiddleware, deleteSemester);
router.get('/semesters/:id',  getSemById)

export default router