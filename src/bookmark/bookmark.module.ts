import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { bookmarksProviders } from './bookmarks.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, ...bookmarksProviders]
})
export class BookmarkModule {}
