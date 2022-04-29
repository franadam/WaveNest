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
import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('/api/sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'sites',
    action: 'create',
    possession: 'any',
  })
  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sitesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'sites',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(+id, updateSiteDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'sites',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sitesService.remove(+id);
  }
}
