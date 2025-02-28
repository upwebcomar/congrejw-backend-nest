// src/app/admin.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get()
  @Roles('admin') // Sólo los usuarios con el rol 'admin' pueden acceder
  async getAdminPanel() {
    return { message: 'Bienvenido al panel de administrador' };
  }
}
