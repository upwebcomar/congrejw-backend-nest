import { Controller, Get, Patch, Body, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('bible/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Obtener libros por usuario
  @Get('user/:userId')
  async getBooksByUser(@Param('userId') userId: string) {
    const result = await this.booksService.findBooksByUser(
      parseInt(userId, 10),
    );
    return result;
  }
  // Obtener capítulos leídos de un libro específico para un usuario
  @Get(':name/user/:userId/read-chapters')
  async getReadChapters(
    @Param('name') name: string,
    @Param('userId') userId: number,
  ) {
    const readChapters = await this.booksService.getReadChapters(name, userId);
    return readChapters;
  }

  // Actualizar un libro del usuario
  @Patch('/user/:userId')
  async updateBook(@Param('userId') userId: number, @Body() book: Book) {
    const result = await this.booksService.updateBook(userId, book);
    return result;
  }
}
