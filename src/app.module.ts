// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './controllers/admin.controller';
import { FilesModule } from './upload/files.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';
import { MyGateway } from './websocket/mygateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que el módulo esté disponible en toda la aplicación
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env', // No cargar .env en producción
    }),
    DatabaseModule.forRoot(),
    AuthModule,
    FilesModule,
    MailModule,
  ],
  controllers: [AppController, AuthController, AdminController],

  providers: [AppService, MyGateway],
})
export class AppModule {}
