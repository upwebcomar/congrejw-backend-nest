// src/app.service.ts
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (this.dataSource.isInitialized) {
        this.logger.log('Conexión con la base de datos establecida correctamente.');
      } else {
        this.logger.error('La base de datos no se inicializó correctamente.');
      }
    } catch (error) {
      this.logger.error('Error al conectar con la base de datos:', error);
    }
  }
}
