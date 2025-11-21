import { Router } from 'express';
import { getChaptersBySubject, createChapter, deleteChapter } from '../controller/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/chapters', getChaptersBySubject); // ?subjectId=...
router.post('/chapters', authMiddleware, createChapter);
router.delete('/chapters/:id', authMiddleware, deleteChapter);

export default router;