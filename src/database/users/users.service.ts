// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profiles } from 'src/database/profiles/profiles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profiles)
    private profileRepository: Repository<Profiles>,
  ) {}

  // Buscar usuario por nombre de usuario
  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username }, relations: ['profile'] });
  }
  async findOne(id: number): Promise<User | undefined> {
    const response = await this.userRepository.findOne({ where: { id }, relations: ['profile'] });
    console.log(response);
    
    return response
  }

    // Obtener todos los anuncios
    async findAll(): Promise<User[]> {
      return this.userRepository.find();
    }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }
  async createUserWithProfile(user: Partial<User>, profile: Partial<Profiles>): Promise<User> {
    // Crear y guardar el perfil primero
    const profileEntity = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(profileEntity);  // Guardamos el perfil
  
    // Crear el usuario y asignarle el perfil guardado
    const userEntity = this.userRepository.create(user);
    userEntity.profile = savedProfile;  // Asignar el perfil con id generado
  
    // Ahora guardamos el usuario con el perfil asignado
    const value = await this.userRepository.save(userEntity);
    console.log('value',value);
    
    return value
  }
    
  

  // Crear un nuevo usuario
  async createUser(user: Partial<User>): Promise<User> {
    
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async updateRoles(payload: { id: number; roles: string[] }[]): Promise<any> {
    for (const userData of payload) {
      const { id, roles } = userData;
  
      // Busca al usuario por su ID
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error(`Usuario con ID ${id} no encontrado`);
      }
  
      // Actualiza los roles
      user.roles = roles;
  
      // Guarda los cambios en la base de datos
      await this.userRepository.save(user);
    }
  
    return { message: 'Roles actualizados correctamente' };
  }
  
  
  
}
