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
export const ONE_DAY = 24 * 60 * 60 * 1000;
