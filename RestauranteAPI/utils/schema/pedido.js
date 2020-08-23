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

const pedidoIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const crearPedidoSchema = Joi.object({
  usuarioId: usuarioIdSchema,
  direccionEnvio: Joi.string().required(),
  nota: Joi.optional(),
});

const estadoPedidoSchema = Joi.object({
  pedidoId: pedidoIdSchema,
  productoId: productoIdSchema,
  restauranteId: restauranteIdSchema,
  estado: Joi.string()
    .valid("Despachado", "Entregado", "Cancelado", "Pendiente")
    .required(),
  // @TODO: falta el precio
});
module.exports = {
  crearPedidoSchema,
  estadoPedidoSchema,
};
