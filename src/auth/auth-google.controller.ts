// auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthGoogleController {
  private hostUrl = ''; // url de la app web frontend
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {
    this.hostUrl = this.config.get('HOST');
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('auth/google');
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      const user = req.user;
      if (!user || !user.email) {
        throw new Error('Invalid user data from Google');
      }

      const token = await this.authService.loginWithEmail(user.email);

      return res.redirect(
        `${this.hostUrl}/login-success?token=${token.access_token}`,
      );
    } catch (error) {
      console.error('Google auth error:', error.message);

      // Redirigís con error al frontend o devolvés JSON si no querés redirigir
      return res.redirect(
        `${this.hostUrl}/login-failure?error=${encodeURIComponent(error.message)}`,
      );
    }
  }
}
