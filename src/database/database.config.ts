import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  async getDatabaseConfig(): Promise<DataSourceOptions> {
    const options: DataSourceOptions = {
      type: 'mariadb' as 'mariadb',
      host: this.configService.get<string>('DB_HOST'),
      port: parseInt(this.configService.get<string>('DB_PORT'), 10),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: false,
    };

    // Sacar configuracion de la base de datos por log
    //console.log('Configuración de la base de datos:', options);

    const maxRetries = 5; // Máximo número de reintentos
    const retryDelay = 3000; // Tiempo entre reintentos en milisegundos

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const dataSource = new DataSource(options);
        await dataSource.initialize();
        console.log('Conexión exitosa a la base de datos');
        await dataSource.destroy(); // Cerramos la conexión después de probarla
        return options;
      } catch (error) {
        console.error(
          `Intento ${attempt} fallido para conectar a la base de datos: ${error.message}`,
        );

        if (attempt === maxRetries) {
          // Agrega un mensaje más claro al error antes de lanzarlo
          const customError = new Error(
            `No se pudo conectar a la base de datos después de ${maxRetries} intentos. Último error: ${error.message}`,
          );
          customError.stack = error.stack; // Mantén el stack original
          throw customError;
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}
