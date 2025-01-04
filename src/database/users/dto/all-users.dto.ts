import { IsString, IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class AllUserDto {
  @IsNumber()
  @Expose() // Expone la propiedad para la serialización
  id: number;

  @IsString()
  @Expose() // Expone la propiedad para la serialización
  username: string;

  @IsString()
  @Expose() // Expone la propiedad para la serialización
  email: string;

  @IsArray()
  @Expose() // Expone la propiedad para la serialización
  roles: string[];

  @Exclude() // Excluye el campo `password` de la serialización
  password?: string;
}
