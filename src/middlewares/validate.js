// Middleware de validation basé sur Joi schemas
function validate(schema) {
  return (req, res, next) => {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query,
    };
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ message: 'Validation échouée', details: error.details });
    }
    // Remplacer les objets nettoyés
    req.body = value.body || req.body;
    req.params = value.params || req.params;
    req.query = value.query || req.query;
    next();
  };
}

module.exports = { validate };


