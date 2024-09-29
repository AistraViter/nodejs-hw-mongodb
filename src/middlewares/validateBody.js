import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const errorDetails = {
      status: 400,
      message: 'Bad Request',
      errors: err.details,
    };
    const error = createHttpError(
      errorDetails.status,
      errorDetails.message,
      errorDetails,
    );
    next(error);
  }
};
