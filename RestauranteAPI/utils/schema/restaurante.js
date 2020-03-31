const Joi = require("@hapi/joi");

const restauranteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const crearRestauranteSchema = {
  nombre: Joi.string()
    .max(50)
    .required(),
  telefono: Joi.number()
    .min(1111111)
    .max(11111111),
  email: Joi.string(),
  horario: Joi.string(),
  logo: Joi.string(),
  creado: Joi.string(),
  estado: Joi.bool(),
  esloga: Joi.string()
};

const actRestauranteSchema = {
  nombre: Joi.string()
    .max(50)
    .required(),
  telefono: Joi.number()
    .min(1111111)
    .max(11111111),
  email: Joi.string(),
  horario: Joi.string(),
  logo: Joi.string(),
  estado: Joi.bool(),
  esloga: Joi.string()
};

module.exports = {
  restauranteIdSchema,
  crearRestauranteSchema,
  actRestauranteSchema
};
