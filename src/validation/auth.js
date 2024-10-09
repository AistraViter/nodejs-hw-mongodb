import Joi from 'joi';
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email should have at most {#limit} characters',
  }),
  password: Joi.string()
  .min(8)
  .max(30)
  .required()
  .messages({
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'any.required': 'Password is required',
  }),});

  export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  
  //Скидання паролю 

  export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
  });
  
  export const resetPasswordQuerySchema = Joi.object({
    token: Joi.string().required(), // Валідація для токена
  });
  