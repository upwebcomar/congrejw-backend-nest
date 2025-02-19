import { IsString, IsOptional } from 'class-validator';
import { UserProfile } from './user-profile.interface';

export class CreateProfileDto implements UserProfile {
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
