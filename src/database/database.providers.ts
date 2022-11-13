import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABSE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://127.0.0.1/tk-bookmark-app')
  },
];