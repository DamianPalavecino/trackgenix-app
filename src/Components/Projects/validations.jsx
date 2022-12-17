import Joi from 'joi';

export const employeeSchema = Joi.object({
  employeeId: Joi.string().hex().length(24).required().messages({
    'string.empty': '"Employee" cannot be empty',
    'any.required': '"Employee" is required'
  }),
  role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').required().messages({
    'string.empty': '"Role" cannot be empty',
    'any.required': '"Role" is required'
  }),
  rate: Joi.number().required().messages({
    'number.empty': '"Rate" cannot be empty',
    'any.required': '"Rate" is required'
  })
});
