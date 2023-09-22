/// <reference types="cookie-session" />
/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="csurf" />
/// <reference types="express-formidable" />
/// <reference types="express-session" />
/// <reference types="multer" />
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';
declare global {
    interface Request extends Express.Request {
        user?: User;
    }
}
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    register(body: CreateUserDto, session: any): Promise<User>;
    googleRegister(req: Request): Promise<User>;
    googleLogin(req: Request): Promise<User>;
    googleCallback(req: Request): Promise<User>;
    login(req: Request, session: any): Promise<User>;
    getProfile(req: Request): User;
    isAuth(req: Request): Promise<string>;
    logout(req: Request): Promise<User>;
}
