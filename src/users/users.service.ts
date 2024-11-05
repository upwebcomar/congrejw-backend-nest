import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'pablo',
      password: '$2b$10$cAQ3y/TaWZ40v/knVG6rb.d.0X6J7TfJjlpfC2wBgGSFTJMjUL2KK' // password123
    }
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  // Simulación de registro (opcional, para pruebas)
  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: this.users.length + 1,
      username,
      password: hashedPassword,
    };
    this.users.push(newUser);
    return newUser;
  }
}
