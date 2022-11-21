import Joi from 'joi';

export const superAdminSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': `"Name" can't be empty`,
    'string.min': `"Name" must have minimum {3} characters`,
    'string.max': `"Name" must have maximum {50} characters`,
    'any.required': `"Name is required`
  }),
  lastName: Joi.string().min(3).max(50).required().messages({
    'string.empty': `"Last Name" can't be empty`,
    'string.min': `"Last Name" must have minimum {3} characters`,
    'string.max': `"Last Name" must have maximum {50} characters`,
    'any.required': `"Last Name is required`
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `"Email" can't be empty`,
      'any.required': `"Email is required`
    }),
  password: Joi.string().min(10).max(30).required().messages({
    'string.empty': `"Password" can't be empty`,
    'string.min': `"Password" must have minimum {10} characters`,
    'string.max': `"Password" must have maximum {30} characters`,
    'any.required': `"Password is required`
  }),
  status: Joi.boolean()
});
