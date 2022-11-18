import { Connection } from "mongoose";
import { LabelSchema } from "./schemas/label.schema";

export const labelsProviders = [
  {
    provide: 'LABEL_MODEL',
    useFactory: (connection: Connection) => connection.model('Label', LabelSchema),
    inject: ['DATABSE_CONNECTION']
  }
];