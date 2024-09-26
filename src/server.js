import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import * as contactServices from "./services/contacts.js";

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
  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const server = app.listen(PORT, () => {
    const port = server.address().port; // Отримуємо призначений порт
    console.log(`Server is running on port ${port}`);
  });
};

//   app.use((req, res, next) => {
//     console.log(`Time: ${new Date().toLocaleString()}`);
//     next();
//   });

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world!',
//   });
// });
