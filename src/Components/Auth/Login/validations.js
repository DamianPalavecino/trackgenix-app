import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': '"Email" must be a valid email',
      'string.empty': '"Email" is required'
    }),
  password: Joi.string().min(8).required().messages({
    'string.min': '"Password" must contain at least 8 characters',
    'string.empty': '"Password" is required'
  }),
  status: Joi.boolean()
});
