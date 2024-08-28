import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.repo.save(createUserDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  find(email: string) {
    return this.repo.find({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user){
      throw new NotFoundException('User not found')
    }
    await this.repo.update(id, updateUserDto);
    return await this.repo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user){
      throw new NotFoundException('User not found')
    }
    return this.repo.delete(id);
  }
}
