import Joi from 'joi';

const baseContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9\s-]{7,20}$/) // Перевірка на формат телефону (може починатися з +, містити лише цифри, пробіли або тире)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must be a valid format with 7-20 digits, and may include spaces, hyphens, or a leading "+" sign.',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Перевірка на формат емейлу без перевірки на TLD
    .min(3)
    .max(20)
    .allow(null) // Дозволяємо null
    .optional() // Необов'язкове поле
    .messages({
      'string.email': 'Email must be a valid email address',
      'string.max': 'Username should have at most {#limit} characters',
    }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only':
        'Contact type must be one of the following: work, home, or personal',
      'any.required': 'Contact type is required',
    }),
  isFavourite: Joi.boolean().optional().messages({
    'boolean.base': 'Favourite status should be either true or false',
  }),
});


export const createContactSchema = baseContactSchema;

export const updateContactSchema = baseContactSchema.fork(['name', 'phoneNumber', 'contactType'], (field) => field.optional());
