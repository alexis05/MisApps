const Joi = require("@hapi/joi");

const restauranteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const crearRestauranteSchema = Joi.object({
  nombre: Joi.string().max(50).required(),
  telefono: Joi.number().required(),
  email: Joi.string().required(),
  horario: Joi.string().required(),
  esloga: Joi.string().required(),
  direccion: Joi.string().required(),
  clave: Joi.string().required(),
});

const actRestauranteSchema = Joi.object({
  nombre: Joi.string().max(50).required(),
  telefono: Joi.number().required(),
  email: Joi.string().required(),
  horario: Joi.string().required(),
  esloga: Joi.string().required(),
  direccion: Joi.string().required(),
  clave: Joi.string().required(),
});

module.exports = {
  restauranteIdSchema,
  crearRestauranteSchema,
  actRestauranteSchema,
};
