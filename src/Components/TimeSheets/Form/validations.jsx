import Joi from 'joi';

export const timeSheetSchema = Joi.object({
  description: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^(?=.[a-zA-Z].)([\w\s\W]+)$/)
    .messages({
      'string.empty': '"Description" cannot be empty',
      'string.min': '"Description" must have minimum {3} characters',
      'string.max': 'Description" must have maximum {50} characters',
      'any.required': '"Description" is required',
      'string.pattern.base': '"Description" cannot have only numbers or special characters'
    }),
  hours: Joi.number().min(1).required(),
  date: Joi.date().max('now').required(),
  task: Joi.string().required(),
  project: Joi.string().required()
});
