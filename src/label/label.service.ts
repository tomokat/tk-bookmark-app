import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Label } from './interfaces/label.interface';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelService {

  constructor(
    @Inject('LABEL_MODEL')
    private labelModel: Model<Label>,
  ){};

  create(createLabelDto: CreateLabelDto) {
    const createdLabel = new this.labelModel(createLabelDto);
    return createdLabel.save();
  }

  findAll() {
    return this.labelModel.find().exec();
  }

  findAllByUser(user: string) {
    return this.labelModel.find().
      where('user').equals(user).
      exec();
  }

  findOne(id: string) {
    return this.labelModel.findById(id);
  }

  update(id: string, updateLabelDto: UpdateLabelDto) {
    return this.findOne(id).update(updateLabelDto).exec();
  }

  remove(id: string) {
    return this.findOne(id).remove().exec();
  }
}
