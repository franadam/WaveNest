import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
  @IsString()
  name: string;
}
