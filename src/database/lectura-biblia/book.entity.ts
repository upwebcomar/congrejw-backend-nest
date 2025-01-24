import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  chapters: number;

  @Column('simple-array') // Almacena un array de capítulos leídos
  readChapters: number[];
}
