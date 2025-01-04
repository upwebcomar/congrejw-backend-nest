// src/users/user.entity.ts
import { Profiles } from 'src/database/profiles/profiles.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

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

  @OneToOne(() => Profiles, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id' }) // Define explícitamente el nombre de la columna
  profile: Profiles;
  
}

  