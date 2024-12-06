import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync, readdirSync, writeFileSync, unlinkSync } from 'fs';

@Injectable()
export class FilesService {
  private readonly uploadDir = join(__dirname, '../../uploads'); // Ruta base

  constructor() {
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists(): void {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  getUploadDir(): string {
    return this.uploadDir;
  }

  getFilePath(filename: string): string {
    return join(this.uploadDir, filename);
  }

  getAllFiles(): string[] {
    try {
      return readdirSync(this.uploadDir); // Devuelve una lista con los nombres de los archivos
    } catch (error) {
      console.error('Error reading files:', error);
      throw new Error('Could not read files');
    }
  }

  saveFile(filename: string, data: Buffer, filepath?: string): string {
    let filenameSanitezed = this.sanitizeFileName(filename)
    try {
      let filePath = filepath ? join(this.uploadDir, filepath) : join(this.uploadDir, filenameSanitezed);
      writeFileSync(filePath, data); // Guarda el archivo usando fs
      console.log(`File saved at: ${filePath}`);
      return filePath
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Could not save file');
    }
  }

  fileExists(filename: string): boolean {
    const filePath = this.getFilePath(filename);
    return existsSync(filePath);
  }

  deleteFile(filename: string): void {
    try {
      const filePath = this.getFilePath(filename);
      if (existsSync(filePath)) {
        unlinkSync(filePath); // Borra el archivo de manera sincrónica
        console.log(`File deleted: ${filePath}`);
      } else {
        console.error('File not found:', filePath);
        throw new Error('File not found');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Could not delete file');
    }
  }
  sanitizeFileName(fileName: string): string {
    return fileName
      .normalize('NFD') // Descompone caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Elimina marcas diacríticas
      .replace(/[^a-zA-Z0-9._-]/g, '_'); // Sustituye caracteres no válidos por "_"
  }
  
}
