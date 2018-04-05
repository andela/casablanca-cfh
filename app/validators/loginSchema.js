import Joi from 'joi';

const loginSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
};

export default loginSchema;
