const express = require('express');
const router = express.Router();
const TemoignagesController = require('../../controllers/temoignages.controller');
const { validate } = require('../../middlewares/validate');
const { temoignageCreateSchema, temoignageModerateSchema } = require('../../validators/temoignages.validators');
const { requireAdmin } = require('../../middlewares/auth');

router.get('/public', TemoignagesController.publicList);
router.get('/', requireAdmin, TemoignagesController.list);
router.post('/', validate(temoignageCreateSchema), TemoignagesController.create);
router.put('/:id', requireAdmin, validate(temoignageModerateSchema), TemoignagesController.moderate);
router.delete('/:id', requireAdmin, TemoignagesController.remove);

module.exports = router;


