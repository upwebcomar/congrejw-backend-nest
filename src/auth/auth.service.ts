// src/auth/auth.service.ts
import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    
  ) {}

  // Método de login
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    
    // Buscar al usuario en la base de datos - TODO: verificar si no user el mail en el mismo campo user
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generar JWT
    const payload = { username: user.username, sub: user.id, roles: user.roles };
    const access_token = this.jwtService.sign(payload)
    console.log(payload)
    return {
      access_token: access_token ,
    };
  }

  // Método de registro
  async register(registerDto: RegisterDto) {
    
    
    
    // Verificar si el usuario ya existe
    const existingUser = await this.userService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);


    // Crear el usuario
    const newUser = new User();
    
    newUser.username = registerDto.username;
    newUser.password = hashedPassword;
    newUser.email = registerDto.email;
    newUser.roles = ['user']; //role user por defecto

    
    
    // Guardar el usuario en la base de datos
    await this.userService.createUser(newUser);

    return { message: 'User registered successfully' };
  }
}
