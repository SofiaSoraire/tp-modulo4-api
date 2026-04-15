const missionRepository = require('../repositories/missionRepository');

class MissionController {
  async createMission(req, res) {
    try {
      const { user_id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({ 
          error: 'Title y description son requeridos' 
        });
      }

      const mission = await missionRepository.createMission({
        title,
        description,
        user: user_id
      });

      res.status(201).json({
        message: 'Misión creada exitosamente',
        mission
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserMissions(req, res) {
    try {
      const { user_id } = req.params;
      const missions = await missionRepository.findMissionsByUser(user_id);
      res.json({ count: missions.length, missions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMission(req, res) {
    try {
      const { user_id, mission_id } = req.params;
      const mission = await missionRepository.findMissionByUserAndId(user_id, mission_id);
      
      if (!mission) {
        return res.status(404).json({ error: 'Misión no encontrada' });
      }

      await missionRepository.deleteMission(mission_id);
      res.json({ message: 'Misión eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MissionController();