import { Document } from 'mongoose';

export interface Label extends Document {
  readonly caption: String;
  readonly user: string;
}