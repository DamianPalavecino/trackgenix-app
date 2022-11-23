import Joi from 'joi';

export const projectSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': '"Project Name" cannot be empty',
    'string.min': '"Project Name" must have a minimum 3 characters',
    'string.max': '"Project Name" must have a maximum 50 characters',
    'any.required': '"Project Name" is required'
  }),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.greater': '"End Date" cannot be greater than "Start Date"'
  }),
  clientName: Joi.string().min(3).max(50).required().messages({
    'string.empty': '"Client Name" cannot be empty',
    'string.min': '"Client Name" must have minimum 3 characters',
    'string.max': '"Client Name" must have maximum 50 characters',
    'any.required': '"Client Name" is required'
  }),
  description: Joi.string().min(3).max(50).required().messages({
    'string.empty': '"Description" cannot be empty',
    'string.min': '"Description" must have minimum 3 characters',
    'string.max': '"Description" must have maximum 50 characters',
    'any.required': '"Description" is required'
  }),
  status: Joi.boolean()
});
