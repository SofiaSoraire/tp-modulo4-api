const Mission = require('../models/Mission');

class MissionRepository {
  async createMission(missionData) {
    const mission = new Mission(missionData);
    return await mission.save();
  }

  async findMissionsByUser(userId) {
    return await Mission.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findMissionByUserAndId(userId, missionId) {
    return await Mission.findOne({ _id: missionId, user: userId });
  }

  async deleteMission(missionId) {
    return await Mission.findByIdAndDelete(missionId);
  }
}

module.exports = new MissionRepository();