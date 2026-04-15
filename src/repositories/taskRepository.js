const Task = require('../models/Task');

class TaskRepository {
  async createTask(taskData) {
    const task = new Task(taskData);
    return await task.save();
  }

  async findTasksByMission(missionId) {
    return await Task.find({ mission: missionId }).sort({ createdAt: -1 });
  }

  async findTaskById(taskId) {
    return await Task.findById(taskId);
  }

  async findTaskByUserAndId(userId, taskId) {
    // Primero obtenemos la tarea
    const task = await Task.findById(taskId).populate('mission');
    if (!task) return null;
    
    // Verificamos que la misión pertenezca al usuario
    if (task.mission.user.toString() !== userId) return null;
    
    return task;
  }

  async updateTask(taskId, updateData) {
    return await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async updateTaskStatus(taskId, status) {
    const updateData = { status };
    
    // Si se marca como completada, agregamos fecha de finalización
    if (status === 'completed') {
      updateData.finish_date = new Date();
    } else {
      updateData.finish_date = null;
    }
    
    return await Task.findByIdAndUpdate(
      taskId,
      updateData,
      { new: true, runValidators: true }
    );
  }

  async deleteTask(taskId) {
    return await Task.findByIdAndDelete(taskId);
  }
}

module.exports = new TaskRepository();