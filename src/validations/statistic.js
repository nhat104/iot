import Joi from 'joi';

export const getByDateSchema = Joi.object({
  date: Joi.string().required(),
});

export const getByWeekSchema = Joi.object({
  dateStart: Joi.string().required(),
});
