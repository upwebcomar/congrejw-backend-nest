import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableroAnuncios } from './tablero-anuncios/tablero-anuncios.entity';
import { TableroAnunciosService } from './tablero-anuncios/tablero-anuncios.service';
import { TableroAnunciosController } from './tablero-anuncios/tablero-anuncios.controller';
import { FilesModule } from 'src/upload/files.module';
import { FilesService } from 'src/upload/files.service';
import { GruposServiciodelcampoController } from './grupos-serviciodelcampo/grupos-serviciodelcampo.controller';
import { GruposServiciodelcampoService } from './grupos-serviciodelcampo/grupos-serviciodelcampo.service';
import { GruposServiciodelcampo } from './grupos-serviciodelcampo/grupos-serviciodelcampo.entity';
import { Profiles } from './profiles/profiles.entity';
import { ProfilesService } from './profiles/profiles.service';
import { ProfilesController } from './profiles/profiles.controller';
import { User } from './users/user.entity';
import { UserService } from './users/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users/user.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            TableroAnuncios,
            GruposServiciodelcampo,
            Profiles,
            User
        ]),
        FilesModule,
        
    ],
    providers:[
        TableroAnunciosService,
        FilesService,
        GruposServiciodelcampoService,
        ProfilesService,
        UserService

    ],
    exports:[
        TableroAnunciosService,
        GruposServiciodelcampoService,
        FilesService,
        ProfilesService,
        UserService,
        TypeOrmModule
    ],
    controllers:[
        TableroAnunciosController,
        GruposServiciodelcampoController,
        ProfilesController,
        UserController

    ]
})
export class DatabaseModule {}
