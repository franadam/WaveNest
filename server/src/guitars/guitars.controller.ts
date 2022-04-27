import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GuitarsService } from './guitars.service';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('/api/guitars')
export class GuitarsController {
  constructor(private readonly guitarsService: GuitarsService) {}

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'guitars',
    action: 'create',
    possession: 'any',
  })
  @Post()
  create(@Body() createGuitarDto: CreateGuitarDto) {
    return this.guitarsService.create(createGuitarDto);
  }

  @Get()
  findAll() {
    return this.guitarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guitarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuitarDto: UpdateGuitarDto) {
    return this.guitarsService.update(+id, updateGuitarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guitarsService.remove(+id);
  }
}
