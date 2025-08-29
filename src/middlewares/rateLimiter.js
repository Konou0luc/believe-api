const rateLimit = require('express-rate-limit');

// Limite stricte pour AUTH
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requêtes / fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Trop de tentatives, réessayez plus tard.'
  }
});

// Limite pour CONTACT pour réduire le spam
const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, contactLimiter };


