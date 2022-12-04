import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Bookmark } from './interfaces/bookmark.interface';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARK_MODEL')
    private bookmarkModel: Model<Bookmark>,
  ){};

  create(createBookmarkDto: CreateBookmarkDto) {
    const createdBookmark = new this.bookmarkModel(createBookmarkDto);
    return createdBookmark.save();
  }

  findAll() {
    return this.bookmarkModel.find().exec();
  }

  findAllByUser(user: string) {
    console.log(`findAllByUser called for ${user}`);
    return this.bookmarkModel.find().
      where('user').equals(user).
      exec();
  }

  findOne(id: string) {
    console.log(`findOne (service) receive ${id}`);
    return this.bookmarkModel.findById(id);
  }

  update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    return this.findOne(id).update(updateBookmarkDto).exec();
  }

  remove(id: string) {
    return this.findOne(id).remove().exec();
  }
}
