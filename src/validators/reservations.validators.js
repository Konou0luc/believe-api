const Joi = require('joi');

const reservationCreateSchema = Joi.object({
  body: Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    telephone: Joi.string().required(),
    service: Joi.string().required(),
    date: Joi.string().required(),
    heure: Joi.string().required(),
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


