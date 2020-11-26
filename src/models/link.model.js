import mongoose from 'mongoose';

const Link = mongoose.model(
  "Link",
  new mongoose.Schema({
    id: { 
      type: String, 
      required: true, 
      unique: true 
    },
    original: { 
      type: String, 
      required: true 
    },
    username: {
      type: String,
      required: true
    },
    description: String,
    tags: String,
    counter: Number
  }),
  'links'
);

export default Link;