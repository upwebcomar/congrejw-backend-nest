import { Injectable } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadInterceptor {
  static createInterceptor(destination: string) {
    return FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), destination);

          // Verifica si la ruta existe; si no, la crea
          fs.access(uploadPath, fs.constants.F_OK, (err) => {
            if (err) {
              fs.mkdir(uploadPath, { recursive: true }, (mkdirErr) => {
                if (mkdirErr) {
                  return cb(mkdirErr, uploadPath);
                }
                cb(null, uploadPath);
              });
            } else {
              cb(null, uploadPath);
            }
          });
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname); // Asigna un nombre único al archivo
        },
      }),
    });
  }
}
