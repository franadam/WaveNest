import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    validate(request: Request, email: string, password: string): Promise<User>;
}
export {};
