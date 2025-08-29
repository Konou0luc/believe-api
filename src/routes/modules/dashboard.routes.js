const express = require('express');
const router = express.Router();
const DashboardController = require('../../controllers/dashboard.controller');
const { requireAdmin } = require('../../middlewares/auth');

router.get('/stats', requireAdmin, DashboardController.stats);

module.exports = router;


