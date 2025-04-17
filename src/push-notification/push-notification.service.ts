import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

import {
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
  VAPID_SUBJECT,
} from './config.js';
import { NotificationPushPayloadDto } from './notification-push-payload.dto.js';

webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

@Injectable()
export class PushNotificationService {
  private subscriptions: any[] = []; // En producción, usar una DB

  async subscribe(subscription: any) {
    this.subscriptions.push(subscription);
    console.log('subscription', subscription);

    return { message: 'Suscripción guardada correctamente' };
  }

  async sendNotification(payload: any) {
    console.log(payload);

    for (const sub of this.subscriptions) {
      try {
        const payloadJson = JSON.stringify(payload);
        await webPush.sendNotification(sub, payloadJson);
        console.log('📢 Notificación enviada');
      } catch (error) {
        console.error('❌ Error enviando push:', error);
      }
    }
    return { message: 'Notificación enviada a todos los suscriptores' };
  }
}
