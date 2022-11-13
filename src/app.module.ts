import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/tk-bookmark-app'), BookmarkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
