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
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
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


