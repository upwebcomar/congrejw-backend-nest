import { Module, DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database.config';
import { DatabaseConfigModule } from './databaseconfig.module';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const logger = new Logger(DatabaseModule.name);

    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
          imports:[DatabaseConfigModule],
          useFactory: async (
            configService: ConfigService,
            dbConfigService: DatabaseConfigService,
          ) => {
            try {
              const dbConfig = await dbConfigService.getDatabaseConfig();
         

              return {
                ...dbConfig,
                retryAttempts: 3,
                retryDelay: 3000,
              };
            } catch (error) {
              logger.error(
                'No se pudo conectar a la base de datos. Continuando sin conexión:',
                error.message,
              );

              return {
                type: 'sqlite',
                database: ':memory:',
                entities: [],
                synchronize: true,
              };
            }
          },
          inject: [ConfigService, DatabaseConfigService], // Inyección explícita
        }),
      ],
      exports: [TypeOrmModule],
      providers:[ConfigService]
    };
  }
}
