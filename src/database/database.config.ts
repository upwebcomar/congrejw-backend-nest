import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) { }

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

    console.log('Configuración de la base de datos:', options);

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
          `Intento ${attempt} fallido para conectar a la base de datos: ${error.message}`
        );

        if (attempt === maxRetries) {
          console.log(`No se pudo conectar a la base de datos después de ${maxRetries} intentos.`);


          return { ...options, entities: [] }; // Retorna una configuración mínima sin entidades
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }
}
