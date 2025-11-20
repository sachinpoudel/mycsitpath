import { Router } from "express";
import express from "express";
import { createSem, deleteSemester, getSem } from "../controller/semController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/semesters', (req, res, next) => getSem(res, req, next)); // Public or Protected
router.post('/semesters', authMiddleware, createSem)
router.delete('/semesters/:id', authMiddleware, deleteSemester);

export default router