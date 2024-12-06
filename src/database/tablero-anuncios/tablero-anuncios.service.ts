import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableroAnuncios } from './tablero-anuncios.entity';
import { CreateAnuncioDto } from './create-anuncio.dto';
import { FilesService } from 'src/upload/files.service';

@Injectable()
export class TableroAnunciosService {
  constructor(
    @InjectRepository(TableroAnuncios)
    private anuncioRepository: Repository<TableroAnuncios>,
    private filesService:FilesService
  ) { }

  // Obtener todos los anuncios
  async findAll(): Promise<TableroAnuncios[]> {
    return this.anuncioRepository.find();
  }

  // Buscar anuncio por ID
  async findById(id: number): Promise<TableroAnuncios | undefined> {
    return this.anuncioRepository.findOne({ where: { id } });
  }

  // Crear un nuevo anuncio
  async create(createAnuncioDto: TableroAnuncios): Promise<TableroAnuncios> {
    // Convertir el valor booleano en show_all a 1 o 0
    createAnuncioDto.show_all = createAnuncioDto.show_all ? 1 : 0; // Adecuacin para la base de datos - el campo en TINYINT
    createAnuncioDto.pathfile = this.filesService.sanitizeFileName(createAnuncioDto.pathfile)
    const anuncio = this.anuncioRepository.create(createAnuncioDto); // Crea la entidad
    return await this.anuncioRepository.save(anuncio); // Guarda la entidad con un id generado
  }
  // Actualizar un anuncio por ID
// Actualizar un anuncio por ID
async update(
  id: number,
  updateAnuncioDto: CreateAnuncioDto,
  newFile?: Express.Multer.File, // Nuevo archivo opcional
): Promise<TableroAnuncios> {
  const anuncio = await this.anuncioRepository.findOne({ where: { id } });
  if (!anuncio) {
    throw new Error('Anuncio no encontrado');
  }

  // Verificar si hay un nuevo archivo
  if (newFile) {
    // Si hay un archivo anterior, eliminarlo
    if (anuncio.pathfile) {
      this.filesService.deleteFile(anuncio.pathfile);
    }

    // Guardar el nuevo archivo en el sistema de archivos
    this.filesService.saveFile(this.filesService.sanitizeFileName(newFile.originalname), newFile.buffer);

    // Actualizar el pathfile en el DTO
    updateAnuncioDto.pathfile = newFile.originalname;
  }

  // Actualizamos el anuncio con los nuevos datos
  // Convertir el valor booleano en show_all a 1 o 0
  updateAnuncioDto.show_all = updateAnuncioDto.show_all ? 1 : 0; // Adecuacin para la base de datos - el campo en TINYINT
  const updatedAnuncio = Object.assign(anuncio, updateAnuncioDto);
  console.log('updatedAnuncio',updatedAnuncio);
  
  return this.anuncioRepository.save(updatedAnuncio);
}


  // Eliminar un anuncio por ID
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.anuncioRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Anuncio no encontrado');
    }

    return { message: 'Anuncio eliminado correctamente' };
  }
  // Nuevo método para reordenar anuncios
async reorderAnuncios(order: { id: number }[]): Promise<{ message: string }> {
  console.log(order);
  
  const updatePromises = order.map((item, index) =>
    this.anuncioRepository.update(item.id, { position: index }),
  );

  await Promise.all(updatePromises);

  return { message: 'Orden de anuncios actualizado correctamente' };
}

}
