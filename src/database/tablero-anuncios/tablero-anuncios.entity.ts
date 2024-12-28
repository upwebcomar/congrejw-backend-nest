import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tablero_anuncios')
export class TableroAnuncios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column()
  pathfile: string;

  @Column()
  page: string;

  @Column({ type: 'tinyint' })
  show_all: number;

  @Column({ type: 'int', default: 0 })
  position: number; // Nuevo campo para el orden
}
