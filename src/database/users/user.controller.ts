import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AllUserDto } from './dto/all-users.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}



//GET
  @Get()
  @Roles('admin')
  async findAll(): Promise<AllUserDto[]> {
    const users = await this.userService.findAll(); // Obtiene los usuarios desde el servicio
    return plainToInstance(AllUserDto, users, { excludeExtraneousValues: true });
  }
  

  @Get(':id')
  

  async findOne(@Param('id') id: number): Promise<UserResponseDto> {
    
    const user = await this.userService.findOne(id);

    const userResponse = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
    userResponse.profile = user.profile
    return userResponse
  }

  //POST
  @Post()
  @Roles('admin')
  async create(
    @Body() data: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(data);
  }
  
  //PUT
  @Put('/roles')
  @Roles('admin')
  async updateRoles(@Body() payload: { id: number; roles: string[] }[]): Promise<any> {
    console.log('Payload recibido:', payload);
    return this.userService.updateRoles(payload);
  }

  @Put(':id')
  @Roles('admin')

  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles('admin')

  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }


  
  
}
