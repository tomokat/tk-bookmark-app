import * as mongoose from 'mongoose';

export const LabelSchema = new mongoose.Schema({
  caption: String,
  user: String,
}, {timestamps: true});