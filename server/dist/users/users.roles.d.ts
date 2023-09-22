import { RolesBuilder } from 'nest-access-control';
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare const roles: RolesBuilder;
