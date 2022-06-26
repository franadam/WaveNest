import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(options: Partial<CreateUserDto>): Promise<User | undefined> {
    const user = await this.userRepo.findOne({ where: { ...options } });
    console.log('service >>user', user);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  save(user: User) {
    return this.userRepo.save(user);
  }

  clearToken(user: User) {
    user.token = '';
    return this.userRepo.save(user);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  findOneById(id: number) {
    if (!id) return null;
    const user = this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  findOneByEmail(email: string) {
    return this.userRepo.findOne({ where: [{ email }, { username: email }] });
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const user = await this.findOneById(id);
    let updateted = { ...user, ...updateUserDto };
    if (updateUserDto.password) {
      const hash = await this.hashPassword(updateUserDto.password);
      updateted = { ...updateted, password: hash };
    }
    if (updateUserDto.email) {
      await this.updateEmail(id, updateUserDto.email);
    }
    console.log('service >> userS', updateted);
    return this.userRepo.save(updateted);
  }

  async updateEmail(id: number, email: string) {
    const user = await this.findOneById(id);
    const isEmailToken = await this.isEmailToken(email);
    if (isEmailToken) {
      throw new BadRequestException('email token');
    }
    return this.userRepo.save({ ...user, email, verified: false });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password: string) {
    const salt = await genSalt(8);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  async isEmailToken(email: string) {
    const usedEmail = await this.findOneByEmail(email);
    return !!usedEmail;
  }

  async verifyAccount(userID: string) {
    const user = await this.findOneById(+userID);
    if (!user) throw new NotFoundException('user not found');
    if (user.verified) throw new BadRequestException('already verefied');
    user.verified = true;
    return this.userRepo.save(user);
  }
}
