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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que el módulo esté disponible en toda la aplicación
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env', // No cargar .env en producción
    }),
    DatabaseModule.forRoot(),
    AuthModule,
    FilesModule,
   
  ],
  controllers: [
    AppController,
     AuthController,
     AdminController,
     
    ],
     
  providers: [
    AppService,
  ],
})
export class AppModule {}
