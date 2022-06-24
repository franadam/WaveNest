import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './Guards/jwt.guard';
import { LocalAuthGuard } from './Guards/local.guard';
import { EmailService } from 'src/email/email.service';
import { GoogleAuthGuard } from './Guards/google.guard';

declare global {
  interface Request extends Express.Request {
    user?: User;
  }
}

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    console.log('body', body);
    const user = await this.authService.register(body);
    session.userID = user.id;
    const token = await this.authService.generateAuthToken(user.id);
    session['x-access-token'] = token;
    session.b = token;
    await this.emailService.registerEmail(user.id, user.email);
    console.log('register session', session);
    user.token = token;
    return user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/register/google')
  async googleRegister(@Request() req: Request) {
    console.log('auth controller google >> req.user', req.user);
    return this.authService.googleRegister(req);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/login/google')
  async googleLogin(@Request() req: Request) {
    console.log('auth controller google >> req.user', req.user);
    return this.authService.googleLogin(req);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleCallback(@Request() req: Request) {
    console.log('auth controller google >> callback', req.user);
    return this.authService.googleCallback(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: Request, @Session() session: any) {
    console.log('login', req.user);
    const token = await this.authService.getAuthToken(req.user.id);
    req.session['x-access-token'] = token;
    session.a = token;
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: Request) {
    console.log('profile', Object.keys(req));
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/token')
  isAuth(@Request() req: Request) {
    console.log('isauth', req.user.token);
    return this.authService.getAuthToken(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logout(@Request() req: Request) {
    const user = req.user;
    req.user = undefined;
    console.log('logout user', user);
    return this.authService.logout(user);
  }
}
