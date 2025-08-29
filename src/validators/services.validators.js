const Joi = require('joi');

const serviceCreateSchema = Joi.object({
  body: Joi.object({
    titre: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
    prix: Joi.number().min(0).required(),
    categorie: Joi.string().min(2).required(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

const serviceUpdateSchema = Joi.object({
  body: Joi.object({
    titre: Joi.string().min(2).optional(),
    description: Joi.string().min(5).optional(),
    prix: Joi.number().min(0).optional(),
    categorie: Joi.string().min(2).optional(),
  }),
  params: Joi.object({ id: Joi.string().required() }),
  query: Joi.object({}).unknown(true),
});

module.exports = { serviceCreateSchema, serviceUpdateSchema };


