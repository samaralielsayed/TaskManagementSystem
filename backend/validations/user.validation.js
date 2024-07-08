const Joi = require("joi");

const phonePattern = /^[0-9]{10,15}$/;

const registerUserSchema = Joi.object({
  password: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
});

const updateUserSchema = Joi.object({
  password: Joi.string(),
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  image: Joi.string(),
  phone: Joi.string().pattern(phonePattern),
});

exports.register = (req, res, next) => {
  const { error } = registerUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

exports.update = (req, res, next) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};
