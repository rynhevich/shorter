import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    password: String,
  }),
  'users'
);

export default User;