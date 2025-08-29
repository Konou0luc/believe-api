const express = require('express');
const router = express.Router();

// Sous-routers (placeholders)
router.use('/auth', require('./modules/auth.routes'));
router.use('/services', require('./modules/services.routes'));
router.use('/reservations', require('./modules/reservations.routes'));
router.use('/temoignages', require('./modules/temoignages.routes'));
router.use('/contact', require('./modules/contact.routes'));
router.use('/dashboard', require('./modules/dashboard.routes'));

module.exports = router;


