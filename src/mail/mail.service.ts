import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, userId: string) {
    const token = jwt.sign(
      { userId },
      this.configService.get('JWT_SECRETKEY'),
      { expiresIn: '12h' },
    );
    const confirmationUrl = `${this.configService.get('HOST')}/mail/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"No Reply" <suralvearmza.upweb.com>',
      subject: 'Confirmación de cuenta',
      template: './confirmation', // La plantilla del correo (opcional)
      context: {
        // Variables para la plantilla
        confirmationUrl,
      },
    });
  }
  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.configService.get('JWT_SECRETKEY'));
    } catch (e) {
      return null;
    }
  }
}
