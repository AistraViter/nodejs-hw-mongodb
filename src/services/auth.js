import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
    const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
  return user;
};

 