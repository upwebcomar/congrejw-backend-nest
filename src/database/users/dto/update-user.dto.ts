import { IsString, IsOptional, isArray } from 'class-validator';


export class UpdateUserDto  {
  @IsString()
  username: string;
  @IsString()
  password: string;
 
  roles: string[];
  @IsString()
  address: string;

  profile_id: number;
}