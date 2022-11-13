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
    //return 'This action adds a new bookmark';
    const createdBookmark = new this.bookmarkModel(createBookmarkDto);
    return createdBookmark.save();
  }

  findAll() {
    //return `This action returns all bookmark`;
    return this.bookmarkModel.find().exec();
  }

  findOne(id: string) {
    //return `This action returns a #${id} bookmark`;
    console.log(`findOne (service) receive ${id}`);
    return this.bookmarkModel.findById(id);
  }

  update(id: string, updateBookmarkDto: UpdateBookmarkDto) {
    //return `This action updates a #${id} bookmark`;
    return this.findOne(id).update(updateBookmarkDto).exec();
  }

  remove(id: string) {
    //return `This action removes a #${id} bookmark`;
    this.findOne(id).remove().exec();
  }
}
