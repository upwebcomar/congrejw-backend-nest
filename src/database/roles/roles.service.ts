import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { RolesEntity } from './roles.entity';
import { RolesDto } from './dto/roles.dto';
import { NewRolesDto } from './dto/newroles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {}

  async findAll(): Promise<RolesEntity[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<RolesEntity> {
    return this.rolesRepository.findOne({ where: { id } });
  }

  async createRoles(role: NewRolesDto): Promise<RolesEntity> {
    const newRole = this.rolesRepository.create(role);
    return this.rolesRepository.save(newRole);
  }

  async update(id: number, role: RolesDto): Promise<RolesEntity> {
    await this.rolesRepository.update(id, role);
    return this.rolesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }
}
