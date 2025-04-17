import { IsString, IsNumber, IsArray } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { Profiles } from '../profiles.entity';

export class UserProfileDto extends Profiles {
  @IsNumber()
  @Expose() // Expone la propiedad para la serialización
  id: number;

  @IsString()
  @Expose() // Expone la propiedad para la serialización
  email: string;

  @IsString()
  @Expose() // Expone la propiedad para la serialización
  image: string;

  @IsString()
  @Expose() // Expone la propiedad para la serialización
  phone: string;

  @IsArray()
  @Expose() // Expone la propiedad para la serialización
  address: string;
}
