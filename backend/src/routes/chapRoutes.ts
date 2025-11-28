import { Router } from 'express';
import { getChaptersBySubject, createChapter, deleteChapter, getChapterById } from '../controller/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/by-sub/:id', getChaptersBySubject); 
router.post('/', createChapter);
router.delete('/:id', authMiddleware, deleteChapter);
router.get('/by-id/:id', getChapterById);

export default router;  