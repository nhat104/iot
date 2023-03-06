import Joi from 'joi';

export const checkSchema = Joi.object({
  userId: Joi.number().required(),
  date: Joi.string().required(),
});
