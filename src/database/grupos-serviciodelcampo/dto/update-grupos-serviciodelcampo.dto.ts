import { IsString, IsOptional } from 'class-validator';

export class UpdateGruposServiciodelcampoDto {
  @IsString()
  @IsOptional()
  pathfile?: string;
}
