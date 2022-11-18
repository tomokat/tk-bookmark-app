import * as mongoose from 'mongoose';

export const LabelSchema = new mongoose.Schema({
  caption: String
}, {timestamps: true});