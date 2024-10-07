import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

// Контролер для отримання всіх контактів з урахуванням userId
export const getContactsController = async (req, res) => {
  const userId = req.user._id; // отримання userId з middleware authenticate
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await contactServices.getAllContacts({
    userId, // додано userId
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

// Контролер для отримання контакту за id з урахуванням userId
export const getContactByIdController = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const contact = await contactServices.getContactById(userId, contactId); // додано userId

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// Контролер для створення нового контакту
export const createContactController = async (req, res, next) => {
  const userId = req.user._id; // отримання userId з authenticate middleware
  const contact = await contactServices.createContact(userId, req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

// Контролер для видалення контакту з урахуванням userId
export const deleteContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const contact = await contactServices.deleteContact(userId, contactId); // додано userId

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

// Контролер для оновлення контакту з урахуванням userId
export const patchContactController = async (req, res, next) => {
  const userId = req.user._id;
  const { contactId } = req.params;

  const result = await contactServices.updateContact(
    userId,
    contactId,
    req.body,
  ); // додано userId

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
