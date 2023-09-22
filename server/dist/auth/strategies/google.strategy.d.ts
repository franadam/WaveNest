import { VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
