// notification.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(type: string, message: string, userId?: number): Promise<Notification> {
    const notification = this.notificationRepository.create({ type, message, userId });
    return this.notificationRepository.save(notification);
  }

  async getNotifications(userId?: number): Promise<Notification[]> {
    if (userId) {
      return this.notificationRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
    }
    return this.notificationRepository.find({ order: { createdAt: 'DESC' } });
  }

  async deleteNotification(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
