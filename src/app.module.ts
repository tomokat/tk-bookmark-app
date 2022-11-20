import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { LabelModule } from './label/label.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tk-bookmark/www'),
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1/tk-bookmark-app'),
    BookmarkModule, LabelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
