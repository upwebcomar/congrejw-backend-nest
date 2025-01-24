  import { IsString, IsNumber, IsArray } from 'class-validator';
  import { Exclude, Expose } from 'class-transformer';
  
  export class UserProfileDto {
    @IsNumber()
    @Expose() // Expone la propiedad para la serialización
    id: number;
  
    @IsString()
    @Expose() // Expone la propiedad para la serialización
    email: string;
  
    @IsString()
    @Expose() // Expone la propiedad para la serialización
    phone: string;
  
    @IsArray()
    @Expose() // Expone la propiedad para la serialización
    address: string;

  }