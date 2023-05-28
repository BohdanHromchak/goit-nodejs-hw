const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone field" }),
  favorite: Joi.boolean()
    .optional()
    .messages({ "any.required": "Missing field favorite" }),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
});

module.exports = {
  contactsAddSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
};
