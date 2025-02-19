import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UploadInterceptor } from './upload.interceptor';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { join } from 'path';

@Controller('files')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @Roles('admin')
  @UseInterceptors(UploadInterceptor.createInterceptor('./uploads')) // Ruta directa
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Uploaded file:', file);
    return { message: 'File uploaded successfully', filename: file.filename };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.filesService.getFilePath(filename);
    res.sendFile(filePath);
  }

  @Get('image-profile/:filename')
  getImageProfile(@Param('filename') filename: string, @Res() res: Response) {
    const filePathBase = this.filesService.getFileBase();
    const filePath = join(filePathBase, 'images-profile', filename);
    console.log(filePath);

    res.sendFile(filePath);
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.filesService.getFilePath(filename);

    // Verifica si el archivo existe
    if (!this.filesService.fileExists(filename)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Descarga el archivo
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        throw new HttpException(
          'Error downloading file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    });
  }

  @Get()
  @Roles('admin')
  getAllFiles() {
    const files = this.filesService.getAllFiles();
    return { files };
  }

  @Delete('delete/:filename') // Endpoint para eliminar un archivo
  @Roles('admin')
  deleteFile(@Param('filename') filename: string) {
    try {
      // Eliminar el archivo usando el servicio
      this.filesService.deleteFile(filename);
      return { message: `File ${filename} deleted successfully.` };
    } catch (error) {
      throw new HttpException(
        'Could not delete file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
