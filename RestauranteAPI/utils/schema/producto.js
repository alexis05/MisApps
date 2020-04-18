const Joi = require("@hapi/joi");

const productoIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const restauranteIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productoTagSchema = Joi.array().items(Joi.string().max(10));

const crearProductoSchema = {
  nombre: Joi.string().max(50).required(),
  detalle: Joi.string(),
  creado: Joi.date(),
  ultima_actualizacion: Joi.date(),
  registrado_por: Joi.string(),
  estado: Joi.string(),
  disponible: Joi.bool(),
  restaurante: Joi.string(),
  precio: Joi.number().min(1).max(1000000).required(),
  fotos: Joi.string().required(),
  tags: productoTagSchema,
  restaurante: restauranteIdSchema,
};

const actProductoSchema = {
  nombre: Joi.string().max(50).required(),
  detalle: Joi.string(),
  ultima_actualizacion: Joi.date(),
  estado: Joi.string(),
  disponible: Joi.bool(),
  precio: Joi.number().min(1).max(1000000).required(),
  fotos: Joi.string().required(),
  tags: productoTagSchema,
};

module.exports = {
  productoIdSchema,
  productoTagSchema,
  crearProductoSchema,
  actProductoSchema,
};
