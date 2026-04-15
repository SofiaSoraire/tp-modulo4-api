const taskRepository = require('../repositories/taskRepository');
const missionRepository = require('../repositories/missionRepository');

class TaskController {
  async createTask(req, res) {
    try {
      const { user_id, mission_id } = req.params;
      const { description, difficulty, estimated_time } = req.body;

      // Validar campos requeridos
      if (!description || !difficulty || !estimated_time) {
        return res.status(400).json({ 
          error: 'description, difficulty y estimated_time son requeridos' 
        });
      }

      // Verificar que la misión existe y pertenece al usuario
      const mission = await missionRepository.findMissionByUserAndId(user_id, mission_id);
      
      if (!mission) {
        return res.status(404).json({ error: 'Misión no encontrada' });
      }

      const task = await taskRepository.createTask({
        description,
        difficulty,
        estimated_time,
        mission: mission_id
      });

      res.status(201).json({
        message: 'Tarea creada exitosamente',
        task
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMissionTasks(req, res) {
    try {
      const { user_id, mission_id } = req.params;
      
      // Verificar que la misión pertenezca al usuario
      const mission = await missionRepository.findMissionByUserAndId(user_id, mission_id);
      
      if (!mission) {
        return res.status(404).json({ error: 'Misión no encontrada' });
      }

      const tasks = await taskRepository.findTasksByMission(mission_id);
      
      res.json({
        count: tasks.length,
        tasks
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTaskDetail(req, res) {
    try {
      const { user_id, task_id } = req.params;
      
      const task = await taskRepository.findTaskByUserAndId(user_id, task_id);
      
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.json({ task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { user_id, task_id } = req.params;
      const { description, difficulty, estimated_time } = req.body;

      // Verificar que la tarea existe y pertenece al usuario
      const existingTask = await taskRepository.findTaskByUserAndId(user_id, task_id);
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      const updateData = {};
      if (description) updateData.description = description;
      if (difficulty) updateData.difficulty = difficulty;
      if (estimated_time) updateData.estimated_time = estimated_time;

      const updatedTask = await taskRepository.updateTask(task_id, updateData);
      
      res.json({
        message: 'Tarea actualizada exitosamente',
        task: updatedTask
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const { user_id, task_id } = req.params;
      const { status } = req.body;

      if (!status || !['pending', 'in_progress', 'completed'].includes(status)) {
        return res.status(400).json({ 
          error: 'status debe ser: pending, in_progress o completed' 
        });
      }

      // Verificar que la tarea existe y pertenece al usuario
      const existingTask = await taskRepository.findTaskByUserAndId(user_id, task_id);
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      const updatedTask = await taskRepository.updateTaskStatus(task_id, status);
      
      res.json({
        message: 'Estado actualizado exitosamente',
        task: updatedTask
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { user_id, task_id } = req.params;
      
      // Verificar que la tarea existe y pertenece al usuario
      const existingTask = await taskRepository.findTaskByUserAndId(user_id, task_id);
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      await taskRepository.deleteTask(task_id);
      
      res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();