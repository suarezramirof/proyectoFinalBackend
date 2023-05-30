import Joi from "joi";

const validateProducts = (product, required) => {
  const schema = Joi.object({
    nombre: required ? Joi.string().required() : Joi.string(),
    descripcion: required ? Joi.string().required() : Joi.string(),
    foto: required ? Joi.string().uri().required() : Joi.string().uri(),
    codigo: required ? Joi.string().required() : Joi.string(),
    precio: required ? Joi.number().required() : Joi.number(),
    stock: required ? Joi.number().required() : Joi.number(),
  });

  const { error, value } = schema.validate(product);
  if (error) {
    throw error;
  }
  return value
};

export default validateProducts;
