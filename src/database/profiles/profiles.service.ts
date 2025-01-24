import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private readonly profilesRepository: Repository<Profiles>,
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
  

  async update(id: number, data: Partial<Profiles>): Promise<Profiles> {
    await this.profilesRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profilesRepository.delete(id);
  }
}
