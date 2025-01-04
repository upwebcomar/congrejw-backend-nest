import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {  CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { Profiles } from './profiles.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(
    @Body() data: CreateProfileDto,
  ): Promise<Profiles> {
    return this.profilesService.create(data);
  }

  @Get()
  async findAll(): Promise<Profiles[]> {
    return this.profilesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Profiles> {
    console.log('param id',id);
    
    return this.profilesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProfileDto,
  ): Promise<Profiles> {
    return this.profilesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.profilesService.remove(id);
  }
}
