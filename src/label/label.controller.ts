import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { userInfo } from 'os';

@Controller('bookmark-api/label')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto) {
    return this.labelService.create(createLabelDto);
  }

  @Get()
  findAll() {
    return this.labelService.findAll();
  }

  @Get('/user/guest')
  findAllForGuest() {
    return this.labelService.findAllByUser('');
  }

  @Get('/user/:user')
  findAllByUser(@Param('user') user: string) {
    return this.labelService.findAllByUser(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabelDto: UpdateLabelDto) {
    return this.labelService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labelService.remove(id);
  }
}
