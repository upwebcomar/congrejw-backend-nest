// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column("simple-array") // Almacena como texto separado por comas (ej: 'admin,user')
  roles: string[]; // Por ejemplo: ['admin', 'user']
}

  