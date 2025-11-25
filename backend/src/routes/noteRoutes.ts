import { Router } from 'express';
import {  getNotesByChapterId, createNote, deleteNote } from '../controller/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/by-chap/:id', getNotesByChapterId); // ?chapterId=...
router.post('/', authMiddleware, createNote);
router.delete('/:id', authMiddleware, deleteNote);
// router.get('/:chapter_id', authMiddleware, getNoteByChapter);

export default router;