import { IsString } from 'class-validator';

export class CreateSiteDto {
  @IsString()
  address: string;

  @IsString()
  hours: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}
