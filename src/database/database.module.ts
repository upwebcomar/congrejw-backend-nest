import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableroAnuncios } from './tablero-anuncios/tablero-anuncios.entity';
import { TableroAnunciosService } from './tablero-anuncios/tablero-anuncios.service';
import { TableroAnunciosController } from './tablero-anuncios/tablero-anuncios.controller';
import { FilesModule } from 'src/upload/files.module';
import { FilesService } from 'src/upload/files.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([TableroAnuncios]),
        FilesModule,
    ],
    providers:[
        TableroAnunciosService,
        FilesService,

    ],
    exports:[
        TableroAnunciosService,
    ],
    controllers:[
        TableroAnunciosController,

    ]
})
export class DatabaseModule {}
