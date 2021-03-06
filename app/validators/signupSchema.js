import Joi from 'joi';

const signupSchema = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required()
  }
};
module.exports = signupSchema;
