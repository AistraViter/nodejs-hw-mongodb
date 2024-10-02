import { UsersCollection } from '../db/models/user.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.create(payload);
  return user;
};
