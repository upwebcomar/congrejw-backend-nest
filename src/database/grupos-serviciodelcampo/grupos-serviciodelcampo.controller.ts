import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GruposServiciodelcampo } from './grupos-serviciodelcampo.entity';
import { GruposServiciodelcampoService } from './grupos-serviciodelcampo.service';
import { CreateGruposServiciodelcampoDto } from './dto/create-grupos-serviciodelcampo.dto';
import { UpdateGruposServiciodelcampoDto } from './dto/update-grupos-serviciodelcampo.dto';

@Controller('grupos-serviciodelcampo')
export class GruposServiciodelcampoController {
  constructor(private readonly grupoService: GruposServiciodelcampoService) {}

  @Post()
  async create(
    @Body() data: CreateGruposServiciodelcampoDto,
  ): Promise<GruposServiciodelcampo> {
    return this.grupoService.create(data);
  }

  @Get()
  async findAll(): Promise<GruposServiciodelcampo[]> {
    return this.grupoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<GruposServiciodelcampo> {
    return this.grupoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateGruposServiciodelcampoDto,
  ): Promise<GruposServiciodelcampo> {
    return this.grupoService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.grupoService.remove(id);
  }
}
