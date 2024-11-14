import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedResource() {
    return { message: 'Access to protected resource granted!' };
}

}