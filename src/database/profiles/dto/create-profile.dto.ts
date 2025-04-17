import { IsString, IsOptional } from 'class-validator';
import { Profile } from './profile.interface';

export class CreateProfileDto implements Profile {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  image: string;
  @IsString()
  phone: string;
  @IsString()
  address: string;
}
