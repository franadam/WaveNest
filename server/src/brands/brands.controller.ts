import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { QueryInt } from 'src/interfaces/Query.interface';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('/api/guitars/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'brands',
    possession: 'any',
    action: 'create',
  })
  @Post()
  create(@Body() createBrandDto: CreateBrandDto, @UserRoles() userRole) {
    console.log('userRole', userRole);
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll(@Query() query: QueryInt) {
    return this.brandsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'brands',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'brands',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
