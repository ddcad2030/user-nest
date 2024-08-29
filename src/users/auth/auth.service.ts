import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dto/create-user.dto';

const scrypt1 = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(10).toString('hex');
    const hash = (await scrypt1(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    let body: CreateUserDto = {
      email: email,
      password: result
    }

    const newUser = await this.userService.create(body);
    return newUser;
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    // const [salt,storedHash] = user.password

  }
}
