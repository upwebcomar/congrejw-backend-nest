// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // Si no hay roles definidos, permite el acceso.
    }

    const { user } = context.switchToHttp().getRequest();

    // Verifica si el usuario tiene algún rol requerido.
    const hasRole = user?.roles?.some((role: string) => requiredRoles.includes(role));

    if (!hasRole) {
      throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
    }

    return hasRole;
  }
}
