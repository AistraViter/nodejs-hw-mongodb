import { Router } from 'express';
import * as contactServices from '../services/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', async (req, res) => {
  const contacts = await contactServices.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

contactsRouter.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactServices.getContactById(contactId);

  // Відповідь, якщо контакт не знайдено
  if (!contact) {
    res.status(404).json({
      message: 'Contact not found',
    });
    return;
  }

  // Відповідь, якщо контакт знайдено
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export default contactsRouter;
