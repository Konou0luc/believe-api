const express = require('express');
const router = express.Router();
const ServicesController = require('../../controllers/services.controller');
const { validate } = require('../../middlewares/validate');
const { serviceCreateSchema, serviceUpdateSchema } = require('../../validators/services.validators');
const { requireAdmin } = require('../../middlewares/auth');

router.get('/', ServicesController.list);
router.post('/', requireAdmin, validate(serviceCreateSchema), ServicesController.create);
router.put('/:id', requireAdmin, validate(serviceUpdateSchema), ServicesController.update);
router.delete('/:id', requireAdmin, ServicesController.remove);

module.exports = router;


