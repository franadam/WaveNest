import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Session,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
import { Serilize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('/api/users')
@Serilize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Get('/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  testy(@Request() req: Request) {
    return 'admin';
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'profile',
    action: 'read',
    possession: 'own',
  })
  @Get('/profile')
  getProfile(@Request() req: Request, @UserRoles() userRoles: UserRole) {
    console.log('userRoles', userRoles);
    return this.usersService.findOneById(req.user.id);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get('/verify')
  async verifyAccount(@Query() { validation }: { validation: string }) {
    const payload = await this.authService.validateToken(validation);
    return this.usersService.verifyAccount(payload.sub);
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    console.log('controller >> updateUserDto', updateUserDto);
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('/:id/email')
  async updateEmail(
    @Param('id') id: string,
    @Body() body: any,
    @Session() session: any,
  ) {
    const user = await this.usersService.updateEmail(+id, Object.keys(body)[0]);
    const token = await this.authService.generateAuthToken(+id);
    session['x-access-token'] = token;
    user.token = token;
    const updated = await this.usersService.save(user);
    console.log('ctr user>> updated', updated);
    await this.emailService.registerEmail(user.id, user.email);
    return updated;
  }
}
