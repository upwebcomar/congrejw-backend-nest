import { IsString, IsBoolean, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateAnuncioDto {
  
  @IsNumber()
  id: number; // Se requiere el ID para identificar qué anuncio se va a actualizar

  titulo: string;

  @IsString()
  descripcion: string;

  @IsString()
  page: string;

  @IsBoolean()
  show_all: number;

  @IsOptional() // Puede no ser obligatorio
  @IsString()
  pathfile?: string;

  @IsNumber()
  position: number;
}
