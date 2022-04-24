import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { roles } from './users.roles';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AccessControlModule.forRoles(roles),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
