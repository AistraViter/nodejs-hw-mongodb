import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT);

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //   app.use((req, res, next) => {
  //     console.log(`Time: ${new Date().toLocaleString()}`);
  //     next();
  //   });

  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello world!',
  //   });
  // });
  app.use('*', (req, res, next) => {
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
