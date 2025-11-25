import { Router } from "express";
import express from "express";
import { createSub, getAllSubs, getSubById, getSubBySemester } from "../controller/subController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/', getAllSubs)
router.post('/', authMiddleware, createSub )
router.get('/by-semester/:id',  getSubBySemester )
router.get('/:id', getSubById )

export default router