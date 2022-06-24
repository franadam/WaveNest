import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const isEmailToken = await this.usersService.isEmailToken(
      createUserDto.email,
    );

    if (isEmailToken) {
      throw new BadRequestException('email in used');
    }

    const hashedPassword = await this.usersService.hashPassword(password);

    const user = await this.usersService.create({
      ...rest,
      password: hashedPassword,
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
    return this.usersService.save(user);
  }

  googleLogin(req: Request) {
    return req.user;
  }

  async googleCallback(req: Request) {
    console.log('callback');
    const user = await this.usersService.findOneByEmail(req.user.email);
    return req.user;
  }

  async googleRegister(
    // createUserDto: CreateUserDto,
    req: Request,
  ): Promise<User> {
    const u: any = this.googleLogin(req);
    const profile = u.getBasicProfile();
    console.log('service>> profile', profile);
    return req.user;
  }

  logout(user: User) {
    return this.usersService.clearToken(user);
  }

  async getAuthToken(userID: number) {
    const user = await this.usersService.findOneById(userID);
    return user.token;
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

  async generateRegisterToken(userID: number) {
    const user = await this.usersService.findOneById(userID);
    console.log('generateRegisterToken>> user', user);
    const payload = { sub: user.id.toString() };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      // expiresIn:'19h'
    });
    return { token, username: `${user.firstname} ${user.lastname}` };
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

  async validateToken(token: string) {
    console.log('auth service >> token', token);
    let payload;
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException('wrong token');
    }

    return payload;
  }
}
