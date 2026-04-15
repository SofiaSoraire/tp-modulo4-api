const express = require('express');
const missionController = require('../controllers/missionController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Aplicar autenticación a todas las rutas
router.use(authMiddleware);

// Rutas de misiones
router.post('/:user_id', missionController.createMission);
router.get('/:user_id', missionController.getUserMissions);
router.delete('/:user_id/:mission_id', missionController.deleteMission);

module.exports = router;