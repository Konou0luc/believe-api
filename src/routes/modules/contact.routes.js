const express = require('express');
const router = express.Router();
const ContactController = require('../../controllers/contact.controller');
const { validate } = require('../../middlewares/validate');
const { contactCreateSchema } = require('../../validators/contacts.validators');
const { requireAdmin } = require('../../middlewares/auth');
const { contactLimiter } = require('../../middlewares/rateLimiter');

router.post('/', contactLimiter, validate(contactCreateSchema), ContactController.create);
router.get('/', requireAdmin, ContactController.list);
router.put('/:id/lu', requireAdmin, ContactController.markRead);

module.exports = router;


