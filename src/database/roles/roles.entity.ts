import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false }) // Establece longitud máxima y no permite nulos
  rol: string;

  @Column({ length: 255, nullable: false }) // Descripción con longitud máxima y no permite nulos
  obs: string;
}
