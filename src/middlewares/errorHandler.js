// Middleware 404
function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Ressource non trouvée' });
}

// Middleware d'erreurs global
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Erreur serveur',
    details: err.details || undefined,
  });
}

module.exports = { notFoundHandler, errorHandler };


