import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class NewRolesDto {
  @IsNumber()
  @Exclude() // Expone la propiedad para la serialización
  id: number;

  @IsString()
  @IsNotEmpty() // Asegura que el rol no esté vacío
  @Expose() // Expone la propiedad para la serialización
  rol: string;

  @IsString()
  @IsNotEmpty() // Asegura que la descripción no esté vacía
  @Expose() // Expone la propiedad para la serialización
  obs: string;
}
