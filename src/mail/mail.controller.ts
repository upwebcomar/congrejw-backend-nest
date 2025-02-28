import { Controller, Get, Query, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { Response } from 'express';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    const decoded = this.mailService.verifyToken(token);
    console.log(decoded);

    if (!decoded) {
      return res.status(400).send('Token inválido o expirado');
    }
    // Aquí puedes actualizar el estado del usuario en la base de datos
    return res.send('Correo verificado exitosamente');
  }
  @Get('test-send')
  async testSend(@Query('email') email: string) {
    return this.mailService.sendUserConfirmation(email, 'testUserId');
  }
}
