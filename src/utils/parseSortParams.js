import { SORT_DEFAULTS } from '../constants/configDefaults.js';
import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  // Якщо sortOrder невідомий, повертаємо дефолтне числове значення для MongoDB
  if (!isKnownOrder) return SORT_DEFAULTS.sortOrder === 'ASC' ? 1 : -1;
  
  // Якщо відомий, то повертаємо числовий еквівалент
  return sortOrder === SORT_ORDER.ASC ? 1 : -1;
};
const parseSortBy = (sortBy) => {
  const keysOfContact = [
    'name',
  ];

  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }

  return SORT_DEFAULTS.sortBy;
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};


  