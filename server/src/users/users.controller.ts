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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { AuthService } from 'src/auth/auth.service';

@Controller('/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
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
  getProdile(@Request() req: Request, @UserRoles() userRoles: UserRole) {
    console.log('getProdile >> req', req.headers);
    console.log('userRoles', userRoles);
    return this.usersService.findOneById(req.user.id);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    console.log('ucontroller pdateUserDto', updateUserDto);
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/:id/email')
  async updateEmail(
    @Param('id') id: string,
    @Body() body: { email: string },
    @Session() session: any,
  ) {
    const user = await this.usersService.updateEmail(+id, body.email);
    const token = await this.authService.generateAuthToken(+id);
    session['x-access-token'] = token;
    user.token = token;
    return user;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
