import Joi from 'joi';

export const superAdminSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-z]+$/)
    .messages({
      'string.empty': '"Name" cannot be empty',
      'string.min': '"Name" must have minimum {3} characters',
      'string.max': '"Name" must have maximum {50} characters',
      'any.required': '"Name is required',
      'string.pattern.base': '"Name" must have only letters'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-z]+$/)
    .messages({
      'string.empty': '"Last Name" cannot be empty',
      'string.min': '"Last Name" must have minimum {3} characters',
      'string.max': '"Last Name" must have maximum {50} characters',
      'any.required': '"Last Name is required',
      'string.pattern.base': '"Last Name" must have only letters'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': '"Email" cannot be empty',
      'any.required': '"Email is required'
    }),
  password: Joi.string().min(10).max(30).required().messages({
    'string.empty': '"Password" cannot be empty',
    'string.min': '"Password" must have minimum {10} characters',
    'string.max': '"Password" must have maximum {30} characters',
    'any.required': '"Password is required'
  }),
  status: Joi.boolean()
});
