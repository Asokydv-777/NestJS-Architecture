import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesService {
  private notes = [
    { id: 1, title: 'First note', content: 'This is the first note' },
    { id: 2, title: 'Second note', content: 'This is the second note' },
  ];

  private nextId = 3;

  findAll() {
    return this.notes;
  }
  findOne(id: number) {
    return this.notes.find((note) => note.id === id);
  }

  create(title: string, content: string) {
    const newNote = { id: this.nextId++, title, content };
    this.notes.push(newNote);
    return newNote;
  }
  update(id: number, title : string , content : string) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return null;
    }

    this.notes[noteIndex] = {...this.notes[noteIndex] , title , content};
    
    return this.notes[noteIndex];
  }
  remove(id: number) {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      return null;
    }
    const deletedNote = this.notes[noteIndex];
    this.notes.splice(noteIndex, 1);
    return deletedNote;
  }
}
