const Joi = require('joi');

const reservationCreateSchema = Joi.object({
  body: Joi.object({
    // Accepter soit nom complet, soit nom + prenom séparés
    nom: Joi.string().required(),
    prenom: Joi.string().optional().allow(''),
    email: Joi.string().email().required(),
    telephone: Joi.string().required(),
    // Accepter soit service, soit typeService (au moins un doit être présent)
    service: Joi.string().optional(),
    typeService: Joi.string().optional(),
    date: Joi.string().required(),
    heure: Joi.string().required(),
    message: Joi.string().optional().allow(''),
  }).custom((value, helpers) => {
    // Vérifier qu'au moins service ou typeService est présent
    if (!value.service && !value.typeService) {
      return helpers.error('any.custom', { message: 'service ou typeService est requis' });
    }
    return value;
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

const reservationStatusSchema = Joi.object({
  body: Joi.object({
    statut: Joi.string().valid('en_attente', 'confirmé', 'annulé').required(),
  }),
  params: Joi.object({ id: Joi.string().required() }),
  query: Joi.object({}).unknown(true),
});

module.exports = { reservationCreateSchema, reservationStatusSchema };


