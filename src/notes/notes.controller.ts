import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const note = this.notesService.findOne(Number(id));
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto.title, dto.content);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    const note = this.notesService.update(Number(id), dto.title, dto.content);
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const note = this.notesService.remove(Number(id));
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return { message: 'Note deleted successfully' };
  }
}
