const Joi = require("@hapi/joi");

const usuarioIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const crearUsuarioSchema = {
  nombre: Joi.string().max(80).required(),
  apellido: Joi.string().max(80).required(),
  email: Joi.string().required(),
  telefono: Joi.string().max(20),
  direccion: Joi.string().max(200),
  creado: Joi.date(),
  clave: Joi.string().required(),
  foto: Joi.string(),
  estado: Joi.boolean(),
  role: Joi.string(),
};

module.exports = {
  usuarioIdSchema,
  crearUsuarioSchema,
};
