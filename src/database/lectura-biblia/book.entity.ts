import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

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

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // Especificamos el nombre de la columna de la relación
  user?: User;

  @Column()
  userId?: number; // Asegúrate de que esta columna esté en la base de datos
}
