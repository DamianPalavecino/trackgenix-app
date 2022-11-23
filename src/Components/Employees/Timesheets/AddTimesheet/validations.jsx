import Joi from 'joi';

export const timeSheetSchema = Joi.object({
  description: Joi.string().required().trim().min(3).max(50).messages({
    'string.empty': '"Description" cannot be empty',
    'string.min': '"Description" must have minimum {3} characters',
    'string.max': 'Description" must have maximum {50} characters',
    'any.required': '"Description" is required'
  }),
  hours: Joi.number().integer().min(1).positive().required(),
  date: Joi.date().required(),
  task: Joi.string().required(),
  project: Joi.string().required()
});
