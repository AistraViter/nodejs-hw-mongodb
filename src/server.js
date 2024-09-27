import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(contactsRouter); // Додаємо роутер до app як middleware
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    const port = server.address().port; // Отримуємо призначений порт
    console.log(`Server is running on port ${port}`);
  });
};
