const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authMiddleware);

// Rutas de tareas
router.post('/:user_id/:mission_id', taskController.createTask);
router.get('/:user_id/:mission_id', taskController.getMissionTasks);
router.get('/:user_id/detail/:task_id', taskController.getTaskDetail);
router.put('/:user_id/:task_id', taskController.updateTask);
router.patch('/:user_id/:task_id/status', taskController.updateTaskStatus);
router.delete('/:user_id/:task_id', taskController.deleteTask);

module.exports = router;