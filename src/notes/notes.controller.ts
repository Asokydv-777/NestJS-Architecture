import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findone(@Param('id') id: string) {
    const note = this.notesService.findOne(Number(id));

    return { data: note };
  }

  @Post()
  create(@Body() body: { title: string; content: string }) {
    const note = this.notesService.create(body.title, body.content);
    return { data: note };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; content: string },
  ) {
    const note = this.notesService.update(Number(id), body.title, body.content);

    return { data: note };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.notesService.remove(Number(id));
    return { message: 'note has been deleted' };
  }
}
