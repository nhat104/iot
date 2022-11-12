import Joi from 'joi';

export const signupSchema = Joi.object({
  fullName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  birthday: Joi.string(),
  address: Joi.string(),
  image: Joi.string(),
  role: Joi.string(),
});
