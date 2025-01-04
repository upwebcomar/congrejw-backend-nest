import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profiles } from './profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private readonly grupoRepository: Repository<Profiles>,
  ) {}

  async create(data: Partial<Profiles>): Promise<Profiles> {
    const grupo = this.grupoRepository.create(data);
    return this.grupoRepository.save(grupo);
  }

  async findAll(): Promise<Profiles[]> {
    return this.grupoRepository.find();
  }

  async findOne(id: number): Promise<Profiles> {
    return this.grupoRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<Profiles>): Promise<Profiles> {
    await this.grupoRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.grupoRepository.delete(id);
  }
}
