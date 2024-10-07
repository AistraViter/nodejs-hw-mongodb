import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { PAGINATION_DEFAULTS } from '../constants/index.js';
import { SORT_DEFAULTS } from '../constants/index.js';

// Отримання всіх контактів з урахуванням userId
export const getAllContacts = async ({
  userId, // нове поле для фільтрації за користувачем
  page = PAGINATION_DEFAULTS.page,
  perPage = PAGINATION_DEFAULTS.perPage,
  sortOrder = SORT_DEFAULTS.sortOrder.ASC ? 1 : -1,
  sortBy = SORT_DEFAULTS.sortBy,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  // Запит контактів, що належать користувачеві
  const contactsQuery = ContactsCollection.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

// Отримання контакту за ID з урахуванням userId
export const getContactById = async (userId, contactId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

// Створення нового контакту з додаванням userId
export const createContact = async (userId, payload) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

// Видалення контакту з урахуванням userId
export const deleteContact = async (userId, contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

// Оновлення контакту з урахуванням userId
export const updateContact = async (userId, contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
