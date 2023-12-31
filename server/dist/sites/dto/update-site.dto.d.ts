import { CreateSiteDto } from './create-site.dto';
declare const UpdateSiteDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSiteDto>>;
export declare class UpdateSiteDto extends UpdateSiteDto_base {
    address: string;
    hours: string;
    phone: string;
    email: string;
}
export {};
