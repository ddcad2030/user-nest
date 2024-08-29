import { IsEmail, IsNotEmpty } from 'class-validator';
import { Index } from 'typeorm';

export class CreateUserDto {
  //   @IsNotEmpty()
  @IsEmail()
  @Index({ unique: true })
  email: string;

  @IsNotEmpty()
  password: string;
}
