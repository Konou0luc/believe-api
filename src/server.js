const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./config/db');
const { authLimiter, contactLimiter } = require('./middlewares/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');
const { loadEnv } = require('./config/env');
const { ensureInitialSuperAdmin } = require('./utils/bootstrapAdmin');

// Charger les variables d'environnement
loadEnv();

const app = express();

// Sécurité et utilitaires
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Configuration CORS améliorée
const corsOptions = {
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://believe-wisdom.vercel.app',
      'https://believe-wisdom-web.vercel.app',
      process.env.CORS_ORIGIN,
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    
    // Si CORS_ORIGIN est '*', autoriser toutes les origines
    if (process.env.CORS_ORIGIN === '*') {
      return callback(null, true);
    }
    
    // Vérifier si l'origine est autorisée
    if (allowedOrigins.some(allowed => origin.includes(allowed) || allowed === '*')) {
      callback(null, true);
    } else {
      callback(null, true); // Autoriser temporairement pour le développement
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Limiteurs de rate spécifiques aux routes
app.use('/api/auth', authLimiter);
app.use('/api/contact', contactLimiter);

// Routes API
app.use('/api', routes);

// Gestion 404 et erreurs
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT;

// Démarrage du serveur après connexion à la DB
connectToDatabase()
  .then(async () => {
    // Bootstrap superadmin si variables fournies
    try { await ensureInitialSuperAdmin(); } catch (e) { console.error('[bootstrap] erreur:', e); }
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

module.exports = app;


