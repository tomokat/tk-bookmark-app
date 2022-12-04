import * as mongoose from 'mongoose';

export const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  notes: String,
  labels: { type: Array, "default": []},
  user: String
}, {timestamps: true});