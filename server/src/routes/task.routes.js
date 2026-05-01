import { Router } from 'express';
import { addTask, editTask, listTasks, removeTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/', listTasks);
router.post('/', addTask);
router.put('/:id', editTask);
router.patch('/:id', editTask);
router.delete('/:id', removeTask);

export default router;
