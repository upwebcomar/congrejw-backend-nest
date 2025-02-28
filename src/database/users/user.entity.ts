// src/users/user.entity.ts
import { Profiles } from 'src/database/profiles/profiles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from '../lectura-biblia/book.entity';

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

  @Column('simple-array') // Almacena como texto separado por comas (ej: 'admin,user')
  roles: string[]; // Por ejemplo: ['admin', 'user']

  @Column({ default: false })
  isVerified: boolean; // Indica si el usuario ha verificado su email

  @Column({ default: true })
  isActive: boolean; // Indica si la cuenta está activa

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date; // Registra la fecha del último login

  @OneToOne(() => Profiles, (profile) => profile.user, { cascade: true })
  @JoinColumn({ name: 'profile_id' }) // Define explícitamente el nombre de la columna
  profile: Profiles;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];
}
