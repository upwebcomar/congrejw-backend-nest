import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/database/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/users/user.entity';
import { Profiles } from 'src/database/profiles/profiles.entity';

@Module({
  imports: [
    ConfigModule, // Asegúrate de importar ConfigModule
    TypeOrmModule.forFeature([User,Profiles]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule aquí
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRETKEY'), // Lee la clave secreta de la configuración
        signOptions: {
          expiresIn: "30d", // 7 días en segundos
        },
      }),
      inject: [ConfigService], // Inyecta ConfigService para usarlo en la fábrica
    }),
    
  ],
  providers: [AuthService, JwtStrategy,UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
