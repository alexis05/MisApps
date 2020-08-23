const Joi = require("@hapi/joi");
const regexId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const productoIdSchema = regexId;
const restauranteIdSchema = regexId;
const productoTagSchema = Joi.array().items(Joi.string());
const tipoProductoSchema = regexId;
const categoriaSchema = regexId;

const crearProductoSchema = Joi.object({
  nombre: Joi.string().max(50).required(),
  detalle: Joi.string(),
  descripcion_corta: Joi.string().max(100),
  creado: Joi.date(),
  ultima_actualizacion: Joi.date(),
  registrado_por: Joi.string(),
  estado: Joi.string(),
  disponible: Joi.bool(),
  restaurante: Joi.string(),
  precio: Joi.number().min(1).max(1000000).required(),
  precio_sin_descuento: Joi.number().min(1).max(1000000).required(),
  fotos: Joi.string(),
  tags: productoTagSchema,
  restaurante: restauranteIdSchema,
  tipo_producot: tipoProductoSchema,
  categoria: categoriaSchema,
});

const actProductoSchema = Joi.object({
  nombre: Joi.string().max(50).required(),
  detalle: Joi.string(),
  descripcion_corta: Joi.string().max(100),
  ultima_actualizacion: Joi.date(),
  estado: Joi.string(),
  disponible: Joi.bool(),
  precio: Joi.number().min(1).max(1000000).required(),
  fotos: Joi.string().required(),
  tags: productoTagSchema,
});

module.exports = {
  productoIdSchema,
  productoTagSchema,
  crearProductoSchema,
  actProductoSchema,
};
