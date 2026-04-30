import { Router } from 'express';
import { addTask, listTasks } from '../controllers/task.controller.js';

const router = Router();

router.get('/', listTasks);
router.post('/', addTask);

export default router;