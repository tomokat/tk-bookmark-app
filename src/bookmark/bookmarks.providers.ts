import { Connection } from "mongoose";
import { BookmarkSchema } from "./schemas/bookmark.schema";

export const bookmarksProviders = [
  {
    provide: 'BOOKMARK_MODEL',
    useFactory: (connection: Connection) => connection.model('Bookmark', BookmarkSchema),
    inject: ['DATABSE_CONNECTION']
  }
];