const Joi = require('joi');

const contactCreateSchema = Joi.object({
  body: Joi.object({
    nom: Joi.string().required(),
    email: Joi.string().email().required(),
    telephone: Joi.string().allow('', null),
    message: Joi.string().min(5).required(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

module.exports = { contactCreateSchema };


