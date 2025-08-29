const Joi = require('joi');

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    motDePasse: Joi.string().min(6).required(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

const registerSchema = Joi.object({
  body: Joi.object({
    nom: Joi.string().min(2).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    motDePasse: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'superadmin').optional(),
  }),
  params: Joi.object({}).unknown(true),
  query: Joi.object({}).unknown(true),
});

module.exports = { loginSchema, registerSchema };


