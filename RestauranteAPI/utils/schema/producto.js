const Joi = require("@hapi/joi");
const regexId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const productoIdSchema = regexId;
const restauranteIdSchema = regexId;
const productoTagSchema = Joi.array().items(Joi.string());
const tipoProductoSchema = regexId;
const categoriaSchema = regexId;
const atributoIdSchema = regexId;

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
  //precio: Joi.number().min(1).max(1000000).required(),
  //precio_sin_descuento: Joi.number().min(1).max(1000000).required(),
  tags: productoTagSchema,
  restaurante: restauranteIdSchema,
  tipo_producto: tipoProductoSchema,
  categoria: categoriaSchema,
  atributos: Joi.array().items(
    Joi.object().keys({
      atributoId: atributoIdSchema,
      precio: Joi.number(),
      precio_sin_descuento: Joi.number(),
      fotos: Joi.array().items(
        Joi.object().keys({
          url: Joi.string(),
        })
      ),
    })
  ),
});

const actProductoSchema = Joi.object({
  nombre: Joi.string().max(50).required(),
  detalle: Joi.string(),
  descripcion_corta: Joi.string().max(100),
  ultima_actualizacion: Joi.date(),
  estado: Joi.string(),
  disponible: Joi.bool(),
  tags: productoTagSchema,
  atributos: Joi.array().items(
    Joi.object().keys({
      precio: Joi.number(),
      precio_sin_descuento: Joi.number(),
      fotos: Joi.array().items(
        Joi.object().keys({
          url: Joi.string(),
        })
      ),
    })
  ),
});

module.exports = {
  productoIdSchema,
  productoTagSchema,
  crearProductoSchema,
  actProductoSchema,
};
