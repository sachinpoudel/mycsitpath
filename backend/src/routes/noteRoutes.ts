import { Router } from 'express';
import {  getNotesByChapterId, createNote, deleteNote } from '../controller/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/notes/:id', getNotesByChapterId); // ?chapterId=...
router.post('/notes', createNote);
router.delete('/notes/:id', authMiddleware, deleteNote);
// router.get('/notes/:chapter_id', authMiddleware, getNoteByChapter);

export default router;