import { Controller, Get, Post, Put, Body, Param, UseInterceptors, UploadedFile, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TableroAnunciosService } from './tablero-anuncios.service';
import { TableroAnuncios } from './tablero-anuncios.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAnuncioDto } from './create-anuncio.dto';
import { FilesService } from 'src/upload/files.service';

@Controller('tablero-anuncios')
export class TableroAnunciosController {
  constructor(
    private readonly tableroAnunciosService: TableroAnunciosService,
    private filesService: FilesService
  ) { }

  // Obtener todos los anuncios
  @Get()
  async findAll(): Promise<TableroAnuncios[]> {
    return this.tableroAnunciosService.findAll();
  }

  // Obtener un anuncio por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TableroAnuncios | undefined> {
    return this.tableroAnunciosService.findById(Number(id));
  }

  // Crear un nuevo anuncio
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAnuncioDto: CreateAnuncioDto,
  ): Promise<TableroAnuncios> {
    const response = await this.tableroAnunciosService.create(createAnuncioDto as TableroAnuncios);

    this.filesService.saveFile(response.pathfile, file.buffer);
    return response;
  }
  @Put('reorder')
  async reordenarAnuncios(@Body() body: { order: { id: number }[] }) {
    const actualizado = await this.tableroAnunciosService.reorderAnuncios(body.order);
    if (!actualizado) {
      throw new HttpException('Error al reordenar los anuncios.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: 'Orden de anuncios actualizado correctamente.' };
  }

  // Actualizar un anuncio
  @Put(':id')
  @UseInterceptors(FileInterceptor('file')) // Interceptar el archivo si se envía
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File, // Nuevo archivo opcional
    @Body() updateAnuncioDto: CreateAnuncioDto,
  ): Promise<TableroAnuncios> {
    console.log('PUT', updateAnuncioDto);

    // Llamar al servicio para actualizar el anuncio, pasando el archivo si existe
    return this.tableroAnunciosService.update(Number(id), updateAnuncioDto, file);
  }

  // Eliminar un anuncio
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<void> {
    // Obtener el anuncio a eliminar
    const anuncio = await this.tableroAnunciosService.findById(Number(id));
    if (!anuncio) {
      throw new Error('Anuncio no encontrado');
    }

    // Borrar el archivo asociado al anuncio
    if (anuncio.pathfile) {
      this.filesService.deleteFile(anuncio.pathfile); // Borrar el archivo
    }

    // Eliminar el anuncio de la base de datos
    await this.tableroAnunciosService.remove(Number(id));
  }



}
