const Joi = require('joi');

const temoignageCreateSchema = Joi.object({
  body: Joi.object({
    nomClient: Joi.string().required(),
    message: Joi.string().min(5).required(),
    note: Joi.number().min(1).max(5).required(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

const temoignageModerateSchema = Joi.object({
  body: Joi.object({
    valide: Joi.boolean().required(),
  }),
  params: Joi.object({ id: Joi.string().required() }),
  query: Joi.object({}).unknown(true),
});

module.exports = { temoignageCreateSchema, temoignageModerateSchema };


