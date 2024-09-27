import { Router } from 'express';
import {getContactsController, getContactntByIdController} from "../controllers/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', getContactsController);

contactsRouter.get('/contacts/:contactId', getContactntByIdController);

export default contactsRouter;
