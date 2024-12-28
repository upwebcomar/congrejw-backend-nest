import { IsString, IsOptional } from 'class-validator';

export class CreateGruposServiciodelcampoDto {
  @IsString()
  pathfile: string;
}
