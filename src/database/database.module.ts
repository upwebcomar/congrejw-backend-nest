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

@Module({
    imports:[
        TypeOrmModule.forFeature([TableroAnuncios,GruposServiciodelcampo]),
        FilesModule,
    ],
    providers:[
        TableroAnunciosService,
        FilesService,
        GruposServiciodelcampoService,

    ],
    exports:[
        TableroAnunciosService,
        GruposServiciodelcampoService,
    ],
    controllers:[
        TableroAnunciosController,
        GruposServiciodelcampoController,

    ]
})
export class DatabaseModule {}
