const Joi = require('joi');

const temoignageCreateSchema = Joi.object({
  body: Joi.object({
    // Accepter les champs du frontend
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
    note: Joi.number().min(1).max(5).required(),
    commentaire: Joi.string().min(5).required(),
    // Accepter aussi les anciens champs pour compatibilité
    nomClient: Joi.string().optional(),
    message: Joi.string().optional(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

const temoignageModerateSchema = Joi.object({
  body: Joi.object({
    approuve: Joi.boolean().required(),
    // Accepter aussi valide pour compatibilité
    valide: Joi.boolean().optional(),
  }),
  params: Joi.object({ id: Joi.string().required() }),
  query: Joi.object({}).unknown(true),
});

module.exports = { temoignageCreateSchema, temoignageModerateSchema };


