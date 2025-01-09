// notification.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // Ej: 'info', 'warning', 'error'

  @Column()
  message: string;

  @Column()
  userId: number; // Opcional: Si las notificaciones están asociadas a usuarios

  @CreateDateColumn()
  createdAt: Date;
}
