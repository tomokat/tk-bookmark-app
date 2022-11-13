import * as mongoose from 'mongoose';

export const BookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  labels: { type: Array, "default": []},
}, {timestamps: true});