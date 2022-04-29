import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
  @IsString()
  address: string;

  @IsString()
  hours: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}
