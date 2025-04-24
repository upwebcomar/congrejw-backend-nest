// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, LoginDto } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta de login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);

    return this.authService.login(loginDto);
  }

  // Ruta de registro
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
