import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grupos_serviciodelcampo')
export class GruposServiciodelcampo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pathfile: string;

}
