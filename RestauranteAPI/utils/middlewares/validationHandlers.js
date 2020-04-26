function validate(data, schema) {
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error
      ? next(
          res.status(400).json({
            mensaje: error.details[0].message,
          })
        )
      : next();
  };
}

module.exports = validationHandler;
