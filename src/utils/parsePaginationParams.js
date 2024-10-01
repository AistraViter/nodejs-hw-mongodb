import { PAGINATION_DEFAULTS } from '../constants/configDefaults.js';

const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, PAGINATION_DEFAULTS.page);
  const parsedPerPage = parseNumber(perPage, PAGINATION_DEFAULTS.perPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
