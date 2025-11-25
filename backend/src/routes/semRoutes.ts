import { Router } from "express";
import express from "express";
import { createSem, deleteSemester, getSem, getSemById, getSemForClient } from "../controller/semController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/', getSem)
router.post('/', authMiddleware, createSem)
router.delete('/:id', authMiddleware, deleteSemester);
router.get('/:id',  getSemById)

export default router   