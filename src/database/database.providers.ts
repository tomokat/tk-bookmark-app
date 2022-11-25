import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABSE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.dbConnect)
  },
];