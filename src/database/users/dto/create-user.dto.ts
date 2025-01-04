import { IsString, IsOptional, isArray } from 'class-validator';


export class CreateUserDto  {
  @IsString()
  username: string;
  @IsString()
  password: string;
 
  roles: string[];

  profile_id: number;
}