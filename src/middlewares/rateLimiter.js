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

// Limite pour les réservations publiques (recherche par email)
const reservationPublicLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, // 20 requêtes par fenêtre de 5 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Trop de requêtes, réessayez dans quelques minutes.'
  }
});

module.exports = { authLimiter, contactLimiter, reservationPublicLimiter };


