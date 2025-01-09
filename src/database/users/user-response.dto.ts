import { IsString, IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Profiles } from '../profiles/profiles.entity';

// Dto necesario para excluir password en la respuesta

export class UserResponseDto {
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

  @Expose() // Expone la propiedad para la serialización
  profile: Profiles;
}