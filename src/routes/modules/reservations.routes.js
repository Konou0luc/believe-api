const express = require('express');
const router = express.Router();
const ReservationsController = require('../../controllers/reservations.controller');
const { validate } = require('../../middlewares/validate');
const { reservationCreateSchema, reservationStatusSchema } = require('../../validators/reservations.validators');
const { requireAdmin } = require('../../middlewares/auth');
const { reservationPublicLimiter } = require('../../middlewares/rateLimiter');

router.post('/', validate(reservationCreateSchema), ReservationsController.create);
router.get('/', requireAdmin, ReservationsController.list);
router.get('/email/:email', reservationPublicLimiter, ReservationsController.getByEmail);
router.put('/:id', requireAdmin, validate(reservationStatusSchema), ReservationsController.updateStatus);

module.exports = router;


