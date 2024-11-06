import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mariadb', // o el tipo de base de datos que uses
      host: 'db.upweb.com.ar',
      port: 3306,
      username: 'apicongrejw',
      password: 'Dieguiamor*1981',
      database: 'apicongrejw',
      retryAttempts: 2,       // Número de intentos de reconexión
      retryDelay: 3000,       // Tiempo de espera entre intentos (en ms)
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡No usar en producción!
    })
  ],
  controllers: [AppController,AuthController],
  providers: [AppService],
})
export class AppModule {}
