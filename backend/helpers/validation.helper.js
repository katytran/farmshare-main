const Joi = require("@hapi/joi");
const validation = {};

validation.register = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

validation.update = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  password: Joi.string().min(6).required(),
});

module.exports = validation;
