import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesService } from './roles.service';
import { RolesDto } from './dto/roles.dto';
import { RolesEntity } from './roles.entity';
import { NewRolesDto } from './dto/newroles.dto';
import { DeleteResult } from 'typeorm';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // Obtener todos los roles
  @Get()
  @Roles('admin')
  async findAll(): Promise<RolesEntity[]> {
    return this.rolesService.findAll();
  }

  // Obtener un rol por ID
  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: number): Promise<RolesEntity> {
    return this.rolesService.findOne(id);
  }

  // Crear un rol
  @Post()
  @Roles('admin')
  async create(@Body() data: NewRolesDto): Promise<RolesEntity> {
    console.log(data);

    return this.rolesService.createRoles(data);
  }

  // Actualizar un rol
  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: number,
    @Body() data: RolesDto,
  ): Promise<RolesEntity> {
    return this.rolesService.update(id, data);
  }

  // Eliminar un rol
  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    const result = this.rolesService.remove(id);
    return result;
  }
}
