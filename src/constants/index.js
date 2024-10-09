import path from 'node:path';

export const PAGINATION_DEFAULTS = {
  page: 1,
  perPage: 10,
};

export const SORT_DEFAULTS = {
  sortOrder: 'ASC', // або SORT_ORDER.ASC, якщо є константи
  sortBy: '_id',
};
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

//Скидання паролю --- УРОК 6

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

//Надсилання листів --- УРОК 6

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');