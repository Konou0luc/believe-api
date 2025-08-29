const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth.controller');
const { validate } = require('../../middlewares/validate');
const { loginSchema, registerSchema } = require('../../validators/auth.validators');
const { authLimiter } = require('../../middlewares/rateLimiter');
const { requireSuperAdmin } = require('../../middlewares/auth');

router.post('/login', authLimiter, validate(loginSchema), AuthController.login);
router.post('/register', authLimiter, requireSuperAdmin, validate(registerSchema), AuthController.register);

module.exports = router;


