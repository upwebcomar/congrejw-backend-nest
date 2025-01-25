import { Module, DynamicModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database.config';
import { DatabaseConfigModule } from './databaseconfig.module';
import { FilesService } from 'src/upload/files.service';
import { GruposServiciodelcampoService } from './grupos-serviciodelcampo/grupos-serviciodelcampo.service';
import { NotificationService } from './notifications/notification.service';
import { ProfilesService } from './profiles/profiles.service';
import { TableroAnunciosService } from './tablero-anuncios/tablero-anuncios.service';
import { UserService } from './users/users.service';
import { GruposServiciodelcampo } from './grupos-serviciodelcampo/grupos-serviciodelcampo.entity';
import { Notification } from './notifications/notification.entity';
import { Profiles } from './profiles/profiles.entity';
import { TableroAnuncios } from './tablero-anuncios/tablero-anuncios.entity';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { GruposServiciodelcampoController } from './grupos-serviciodelcampo/grupos-serviciodelcampo.controller';
import { NotificationController } from './notifications/notification.controller';
import { ProfilesController } from './profiles/profiles.controller';
import { TableroAnunciosController } from './tablero-anuncios/tablero-anuncios.controller';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    const logger = new Logger(DatabaseModule.name);
    const configService = new ConfigService();
    const dbConfigService = new DatabaseConfigService(configService);

    try {
      const dbConfig = await dbConfigService.getDatabaseConfig();
      logger.log('Conexión exitosa a la base de datos');
      return this.createModule(dbConfig);
    } catch (error) {
      logger.error(
        'No se pudo conectar a la base de datos. Continuando sin conexión:',
        error.message,
      );
      const fallbackConfig = this.getFallbackDatabaseConfig();
      return this.createModule(fallbackConfig);
    }
  }

  static createModule(dbConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule,
        TypeOrmModule.forRoot(dbConfig),
        TypeOrmModule.forFeature([
          GruposServiciodelcampo,
          Notification,
          Profiles,
          TableroAnuncios,
          User,
        ]),
      ],
      providers: [
        TableroAnunciosService,
        GruposServiciodelcampoService,
        FilesService,
        ProfilesService,
        UserService,
        NotificationService,
        ConfigService,
        DatabaseConfigService,
      ],
      exports: [
        TypeOrmModule,
        TableroAnunciosService,
        GruposServiciodelcampoService,
        FilesService,
        ProfilesService,
        UserService,
        NotificationService,
        ConfigService,
        DatabaseConfigService,
      ],
      controllers:[
        UserController,
        GruposServiciodelcampoController,
        NotificationController,
        ProfilesController,
        TableroAnunciosController
      ]
    };
  }

  static getFallbackDatabaseConfig(): Record<string, any> {
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [],
      synchronize: true,
      logging: false,
    };
  }
}
