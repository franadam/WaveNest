import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEnum(UserRole)
  roles: UserRole;

  @IsBoolean()
  verified: boolean;
}
