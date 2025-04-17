import { Controller, Post, Body } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { NotificationPushPayloadDto } from './notification-push-payload.dto';

@Controller('push')
export class PushNotificationController {
  constructor(private readonly pushService: PushNotificationService) {}

  @Post('subscribe')
  async subscribe(@Body() subscription: any) {
    return this.pushService.subscribe(subscription);
  }

  @Post('send')
  async sendNotification(@Body() payload: any) {
    console.log(payload);

    return this.pushService.sendNotification(payload);
  }
}
