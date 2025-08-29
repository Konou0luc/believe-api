const express = require('express');
const router = express.Router();
const ReservationsController = require('../../controllers/reservations.controller');
const { validate } = require('../../middlewares/validate');
const { reservationCreateSchema, reservationStatusSchema } = require('../../validators/reservations.validators');
const { requireAdmin } = require('../../middlewares/auth');

router.post('/', validate(reservationCreateSchema), ReservationsController.create);
router.get('/', requireAdmin, ReservationsController.list);
router.put('/:id', requireAdmin, validate(reservationStatusSchema), ReservationsController.updateStatus);

module.exports = router;


