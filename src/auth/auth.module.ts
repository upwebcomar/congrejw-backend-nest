import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy,UserService],
  exports: [AuthService,UserService],
})
export class AuthModule {}
