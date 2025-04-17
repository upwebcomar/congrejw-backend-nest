export class NotificationPushPayloadDto {
  body: string;
  icon: string;
  vibrate: [];
  data: { url: string };
}
