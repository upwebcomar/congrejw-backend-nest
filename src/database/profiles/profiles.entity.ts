import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from './dto/user-profile.interface';
import { User } from 'src/database/users/user.entity';

@Entity('profiles')
export class Profiles implements UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })

  user: User;

}
