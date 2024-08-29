import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      return { success: true, message: 'Create successful' };
    } catch (error) {
      return { success: fail, message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const data = await this.usersService.findAll();
      return { success: true, message: 'Fetch successful', data };
    } catch (error) {
      return { success: fail, message: error.message };
    }
  }

  @Serialize(UserDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(+id);
    return data;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(+id, updateUserDto);
      return { success: true, message: 'Update successful' };
    } catch (error) {
      return { success: fail, message: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.remove(+id);
      return { success: true, message: 'Delete successful' };
    } catch (error) {
      return { success: fail, message: error.message };
    }
  }
}
