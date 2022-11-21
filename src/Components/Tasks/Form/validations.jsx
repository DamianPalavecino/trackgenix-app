import Joi from 'joi';

export const taskSchema = Joi.object({
  description: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(100)
    .pattern(/^(?=.[a-zA-Z].)([\w\s\W]+)$/)
    .messages({
      'string.empty': '"Description" cannot be empty',
      'string.min': '"Description" must have minimum {3} characters',
      'string.max': 'Description" must have maximum {100} characters',
      'any.required': '"Description" is required',
      'string.pattern.base': '"Description" cannot have only numbers or special characters'
    })
});
