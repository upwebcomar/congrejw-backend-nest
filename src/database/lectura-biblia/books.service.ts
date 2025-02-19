import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { User } from '../users/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Obtener los libros de un usuario específico
  async findBooksByUser(userId: number): Promise<Book[]> {
    const userExists = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado.`);
    }

    return this.booksRepository.find({
      where: { user: { id: userId } },
      select: ['id', 'name', 'chapters', 'readChapters'],
      relations: ['user'],
    });
  }
  // Obtener capítulos leídos de un libro para un usuario
  async getReadChapters(name: string, userId: number): Promise<number[]> {
    const book = await this.booksRepository.findOne({
      where: { name: name, userId: userId }, // Filtrar por bookId y userId
    });

    if (!book) {
      throw new NotFoundException(
        `No se encontraron capítulos para el libro  ${name} y usuario ${userId}`,
      );
    }

    return book.readChapters; // Devuelve el array de capítulos leídos
  }
  // Actualizar la lectura de un libro
  async updateBook(userId: number, bookData: Partial<Book>): Promise<Book> {
    // Buscar el libro por ID y asociarlo al usuario
    let book = await this.booksRepository.findOne({
      where: { name: bookData.name, user: { id: userId } },
      select: ['id', 'readChapters'], // Evitar modificar datos no deseados
      relations: ['user'],
    });

    // Si no se encuentra el libro, crearlo
    if (!book) {
      bookData.id = null;
      book = await this.booksRepository.create({
        ...bookData, // Usamos los datos del libro recibido
        user: { id: userId }, // Asociamos el libro al usuario
      });
    }
    // Asegurarse de que solo se actualicen los capítulos leídos
    if (bookData.readChapters) {
      if (book.readChapters.length === 0) {
        // Si no tiene capítulos leídos, asignamos los primeros capítulos
        book.readChapters = [...bookData.readChapters];
      } else {
        // Si ya tiene capítulos leídos, actualizamos la lista
        book.readChapters = bookData.readChapters;
      }
    }

    // Guardar el libro (actualizado o creado)
    return this.booksRepository.save(book);
  }
}
