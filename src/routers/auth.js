import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default authRouter;

//Скидання паролю
authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.get('/reset-password', (req, res) => {
  const { token } = req.query; // Отримуємо токен з URL

  if (!token) {
    return res.status(400).send('Token is missing');
  }

  // Відправляємо простий HTML
  res.send(`
    <html>
      <head>
        <title>Reset Password</title>
      </head>
      <body>
        <h2>Reset Your Password</h2>
        <form action="/reset-pwd" method="POST">
          <input type="hidden" name="token" value="${token}" />
          <div>
            <label for="password">New Password:</label>
            <input type="password" name="password" required />
          </div>
          <div>
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </body>
    </html>
  `);
});


authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

