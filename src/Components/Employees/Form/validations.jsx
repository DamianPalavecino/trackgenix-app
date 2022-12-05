import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .pattern(/^[a-z ]+$/)
    .messages({
      'string.pattern.base': '"Name" can only contain letters and spaces',
      'string.min': '"Name" must contain at least 3 characters',
      'string.max': '"Name" must have less than 50 characters',
      'string.empty': '"Name" is required'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-z ]+$/)
    .required()
    .messages({
      'string.pattern.base': '"Last name" can only contain letters and spaces',
      'string.min': '"Last name" must contain at least 3 characters',
      'string.max': '"Last name" must have less than 50 characters',
      'string.empty': '"Last name" is required'
    }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(10)
    .required()
    .messages({
      'string.pattern.base': '"Phone" can only contain numbers',
      'string.length': '"Phone" must contain 10 characters',
      'string.empty': '"Phone" is required'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': '"Email" must be a valid email',
      'string.empty': '"Email" is required'
    }),
  status: Joi.boolean()
});
