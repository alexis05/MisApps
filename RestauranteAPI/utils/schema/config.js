const Joi = require("@hapi/joi");

const atributoIdSchema = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const crearAtributoSchema = Joi.object({
  nombre: Joi.string().required(),
  code: Joi.optional(),
  entrada: Joi.string().valid("seleccion", "multipleseleccion").required(),
  valores: Joi.array().items(
    Joi.object().keys({
      valor: Joi.string().required(),
    })
  ),
});

const tipoProductoSchema = Joi.object({
  nombre: Joi.string().required(),
  tipo: Joi.string().valid("digital", "fisico"),
  impuesto: Joi.number(),
  atributos: Joi.array().items(atributoIdSchema),
});

const crearCategoriaSchema = Joi.object({
  nombre: Joi.string().required(),
});
module.exports = {
  crearAtributoSchema,
  tipoProductoSchema,
  crearCategoriaSchema,
};
