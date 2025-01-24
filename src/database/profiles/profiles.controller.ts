import { Controller, Get, Post, Put, Delete, Param, Body, UnauthorizedException, UseGuards } from '@nestjs/common';
import {  CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';
import { Profiles } from './profiles.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
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
  async findOne(@Param('id') id: number): Promise<UserProfileDto> {
    const profile = await this.profilesService.findOne(id);
    const profileResponse = plainToInstance(UserProfileDto, profile, { excludeExtraneousValues: true });
    return profileResponse
    
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
