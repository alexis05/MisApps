const Joi = require("@hapi/joi");

const usuarioIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();
const restauranteIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();
const productoIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const crearCarritoSchema = Joi.object({
  usuarioId: usuarioIdSchema,
  accion: Joi.string().required(),
  productos: Joi.array().items(
    Joi.object().keys({
      productoId: productoIdSchema,
      cantidad: Joi.number().integer().min(1).max(90000),
      restauranteId: restauranteIdSchema,
    })
  ),
});

const detalleCarritoSchema = Joi.object({
  productos: Joi.array().items(productoIdSchema),
});

module.exports = {
  crearCarritoSchema,
  detalleCarritoSchema,
};
