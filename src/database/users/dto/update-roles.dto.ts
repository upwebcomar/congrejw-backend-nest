import { IsArray, IsNumber, IsString, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateRoleDto {
  @IsNumber()
  id: number;

  @IsArray()
  @IsString({ each: true })
  roles: string[];
}

export class UpdateRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateRoleDto)
  users: UpdateRoleDto[];
}
