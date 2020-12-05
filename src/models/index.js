import mongoose from 'mongoose';
import User from './user.model.js';
import Link from './link.model.js';

const db = {};

db.user = User;
db.link = Link;

db.mongoose = mongoose;

export default db;