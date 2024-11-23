import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( config: ConfigService) {
    // Obtén el secreto del ConfigService
    const secret = config.get<string>('JWT_SECRETKEY');
    if (!secret) {
      throw new Error('JWT_SECRETKEY no está definido en la configuración');
    }

    // Configura la estrategia
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Usa el secreto validado
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
