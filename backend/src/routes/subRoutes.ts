import { Router } from "express";
import express from "express";
import { createSub, getAllSubs, getSubById, getSubBySemester } from "../controller/subController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/subjects', authMiddleware, getAllSubs)
router.post('/subjects', authMiddleware, createSub )
router.get('/subjects/by-semester/:id',  getSubBySemester )
router.get('/subjects/:id', authMiddleware, getSubById )

export default router