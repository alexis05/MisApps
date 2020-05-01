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

const crearPedidoSchema = Joi.object({
  usuarioId: usuarioIdSchema,
  lugarEntrega: Joi.string().required(),
  nota: Joi.optional(),
  productos: Joi.array().items(
    Joi.object().keys({
      productoId: productoIdSchema,
      cantidad: Joi.number().integer().min(1).max(90000),
      precio: Joi.number().required(),
      restauranteId: restauranteIdSchema,
    })
  ),
});

module.exports = {
  crearPedidoSchema,
};
