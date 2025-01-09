// notification.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body() createDto: { type: string; message: string; userId?: number }): Promise<Notification> {
    return this.notificationService.createNotification(createDto.type, createDto.message, createDto.userId);
  }

  @Get()
  async getNotifications(@Query('userId') userId?: number): Promise<Notification[]> {
    return this.notificationService.getNotifications(userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: number): Promise<void> {
    return this.notificationService.deleteNotification(id);
  }
}
