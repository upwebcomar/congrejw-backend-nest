import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Injectable()
export class UploadInterceptor {
  static createInterceptor(destination: string) {
    return FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, destination); // Ruta donde se guardarán los archivos
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname); // Asigna un nombre único al archivo
        }
      })
    });
  }
}
