import Joi from 'joi';

export const projectSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  startDate: Joi.date().max('now').required(),
  endDate: Joi.date().max('now').required(),
  clientName: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Client Name cannot be empty',
    'string.min': 'Client Name must have minimum 3 characters',
    'string.max': 'Client Name must have maximum 50 characters',
    'any.required': 'Client Name is required'
  }),
  description: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must have minimum 3 characters',
    'string.max': 'Description must have maximum 50 characters',
    'any.required': 'Description is required'
  }),
  status: Joi.boolean()
});
