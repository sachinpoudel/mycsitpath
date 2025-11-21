import { Router } from 'express';
import { getNotes, createNote, deleteNote } from '../controller/noteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/notes', getNotes); // ?chapterId=...
router.post('/notes', authMiddleware, createNote);
router.delete('/notes/:id', authMiddleware, deleteNote);

export default router;