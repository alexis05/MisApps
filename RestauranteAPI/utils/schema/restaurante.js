const Joi = require("@hapi/joi");

const restauranteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const crearRestauranteSchema = {
  nombre: Joi.string().max(50).required(),
  telefono: Joi.number().required(),
  email: Joi.string().required(),
  horario: Joi.string().required(),
  esloga: Joi.string().required(),
  direccion: Joi.string().required(),
  clave: Joi.string().required(),
};

const actRestauranteSchema = {
  nombre: Joi.string().max(50).required(),
  telefono: Joi.number().min(1111111).max(11111111),
  email: Joi.string(),
  horario: Joi.string(),
  logo: Joi.string(),
  activo: Joi.bool(),
  esloga: Joi.string(),
};

module.exports = {
  restauranteIdSchema,
  crearRestauranteSchema,
  actRestauranteSchema,
};
