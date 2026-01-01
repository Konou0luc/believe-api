const express = require('express');
const router = express.Router();
const CategoriesController = require('../../controllers/categories.controller');
const { requireAdmin } = require('../../middlewares/auth');

router.get('/', CategoriesController.list);
router.post('/', requireAdmin, CategoriesController.create);
router.put('/:id', requireAdmin, CategoriesController.update);
router.delete('/:id', requireAdmin, CategoriesController.remove);

module.exports = router;

