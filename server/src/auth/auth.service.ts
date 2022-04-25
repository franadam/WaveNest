import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    roles: UserRole,
    verified: boolean,
  ): Promise<User> {
    const isEmailToken = await this.usersService.isEmailToken(email);

    if (isEmailToken) {
      throw new BadRequestException('email in used');
    }

    const hashedPassword = await this.usersService.hashPassword(password);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      roles,
      verified,
    });
    return user;
  }

  async login(user: User) {
    console.log('authservice login >> ', user);
    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    user.token = token;
    return user;
  }

  logout(user: User) {
    user.token = '';
    return user;
  }

  async loginJWT(email: string, password: string) {
    const user = await this.usersService.findOne({
      email,
    });
    if (!user) throw new NotFoundException('user not found');
    const isMatch = await this.comparePassword(password, user.password);
    if (!isMatch) throw new UnauthorizedException('wrong credentials');
    return user;
  }

  async generateAuthToken(userID: number) {
    const user = await this.usersService.findOneById(userID);
    const payload = { sub: user.id.toString(), email: user.email };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isMatch = await compare(password, hashedPassword);
    if (!isMatch) throw new UnauthorizedException('wrong credentials');
    return isMatch;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('user not found');
    const isMatch = await this.comparePassword(password, user.password);
    console.log('auth service validateUser >> user', user, isMatch);
    if (user && isMatch) {
      return user;
    }
    return null;
  }
}
