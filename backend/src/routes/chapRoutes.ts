import { Router } from 'express';
import { getChaptersBySubject, createChapter, deleteChapter, getChapterById } from '../controller/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/chapters/:id', getChaptersBySubject); 
router.post('/chapters', authMiddleware, createChapter);
router.delete('/chapters/:id', authMiddleware, deleteChapter);
router.get('/chapters/by-id/:id', getChapterById);

export default router;  