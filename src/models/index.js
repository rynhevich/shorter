import mongoose from 'mongoose';
import User from './user.model.js';

const db = {};

db.user = User;

db.mongoose = mongoose;

export default db;