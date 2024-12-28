import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GruposServiciodelcampo } from './grupos-serviciodelcampo.entity';

@Injectable()
export class GruposServiciodelcampoService {
  constructor(
    @InjectRepository(GruposServiciodelcampo)
    private readonly grupoRepository: Repository<GruposServiciodelcampo>,
  ) {}

  async create(data: Partial<GruposServiciodelcampo>): Promise<GruposServiciodelcampo> {
    const grupo = this.grupoRepository.create(data);
    return this.grupoRepository.save(grupo);
  }

  async findAll(): Promise<GruposServiciodelcampo[]> {
    return this.grupoRepository.find();
  }

  async findOne(id: number): Promise<GruposServiciodelcampo> {
    return this.grupoRepository.findOneBy({ id });
  }

  async update(id: number, data: Partial<GruposServiciodelcampo>): Promise<GruposServiciodelcampo> {
    await this.grupoRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.grupoRepository.delete(id);
  }
}
