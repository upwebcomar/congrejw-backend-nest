// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../database/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../database/users/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Método de login
  async login(loginDto: LoginDto) {
    const { username, email, password } = loginDto;

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
    const payload = {
      username: user.username,
      userId: user.id,
      roles: user.roles,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
    };
  }

  async loginWithEmail(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }
    // Generar JWT
    const payload = {
      username: user.username,
      userId: user.id,
      roles: user.roles,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
    };
  }

  // Método de registro
  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const existingUser = await this.userService.findByUsername(
      registerDto.username,
    );
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

    const newProfile = { name: newUser.username, email: newUser.email };

    // Guardar el usuario en la base de datos
    await this.userService.createUserWithProfile(newUser, newProfile);

    return { message: 'User registered successfully' };
  }
}
