import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/database/users/users.service';

@Module({
  imports: [
    ConfigModule, // Asegúrate de importar ConfigModule
    DatabaseModule,
    //TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa ConfigModule aquí
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRETKEY'), // Lee la clave secreta de la configuración
        signOptions: {
          expiresIn: 604800, // 7 días en segundos
        },
      }),
      inject: [ConfigService], // Inyecta ConfigService para usarlo en la fábrica
    }),
    
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
