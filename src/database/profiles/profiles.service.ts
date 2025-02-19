import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private readonly profilesRepository: Repository<Profiles>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<Profiles>): Promise<Profiles> {
    const grupo = this.profilesRepository.create(data);
    return this.profilesRepository.save(grupo);
  }

  async findAll(): Promise<Profiles[]> {
    return this.profilesRepository.find();
  }

  async findOne(id: number): Promise<Profiles> {
    return this.profilesRepository.findOneBy({ id });
  }

  async findOneWithUser(id: number): Promise<Profiles> {
    return this.profilesRepository.findOne({
      where: { id },
      relations: ['user'], // Aquí 'user' es la relación configurada en tu entidad Profile
    });
  }

  async update(userId: number, data: Partial<Profiles>): Promise<Profiles> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    const result = await this.profilesRepository.update(user.profile.id, data);
    const profile = await this.findOne(userId);
    return profile;
  }

  async remove(id: number): Promise<void> {
    await this.profilesRepository.delete(id);
  }
}
