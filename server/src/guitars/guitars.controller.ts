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
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GuitarsService } from './guitars.service';
import { CreateGuitarDto } from './dto/create-guitar.dto';
import { UpdateGuitarDto } from './dto/update-guitar.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt.guard';
import { ACGuard, UseRoles } from 'nest-access-control';
import { BodyInt, QueryInt } from 'src/interfaces/query.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/images/images.service';
const sharp = require('sharp');

@Controller('/api/guitars')
export class GuitarsController {
  constructor(
    private readonly guitarsService: GuitarsService,
    private readonly imagesService: ImagesService,
  ) {}

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
  findAll(@Query() query: QueryInt) {
    return this.guitarsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/shop')
  shopping(@Body() { filters }: BodyInt) {
    return this.guitarsService.shopping(filters);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('picture', { dest: 'uploads/' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await sharp(file.path)
      // .resize({ width: 250, height: 250 })
      .png()
      .toFile(`${file.path}.png`);
    const upload = await this.imagesService.cloudStorage(`${file.path}.png`);
    return upload;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guitarsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'guitars',
    action: 'update',
    possession: 'any',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuitarDto: UpdateGuitarDto) {
    return this.guitarsService.update(+id, updateGuitarDto);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'guitars',
    action: 'delete',
    possession: 'any',
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: Request) {
    console.log('controller >> guittar', req.user);
    return this.guitarsService.remove(+id);
  }
}
