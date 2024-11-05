import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
        
    const user = await this.userService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async register(username: string, password: string) {
    const user = await this.userService.register(username,password);
    console.log(user);
    
  }
}

