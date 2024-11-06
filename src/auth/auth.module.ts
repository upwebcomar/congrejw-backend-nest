// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy,UserService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
