import { Document } from 'mongoose';

export interface Bookmark extends Document {
  readonly title: String;
  readonly url: String;
  readonly notes: String;
}
