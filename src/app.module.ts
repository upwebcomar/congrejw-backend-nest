// src/app.module.ts
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // hace que el módulo esté disponible en toda la aplicación
      envFilePath: '.env', // especifica el archivo de variables de entorno
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        retryAttempts: 2,
        retryDelay: 3000,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // ¡No usar en producción!
        afterConnect: () => {
          const logger = new Logger('TypeORM');
          logger.log('Conexión con la base de datos establecida correctamente.');
        },
        logging:true
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
