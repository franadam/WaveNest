import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { EmailService } from 'src/email/email.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    private readonly emailService;
    constructor(usersService: UsersService, authService: AuthService, emailService: EmailService);
    testy(req: Request): string;
    getProfile(req: Request, userRoles: UserRole): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    verifyAccount({ validation }: {
        validation: string;
    }): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: Partial<UpdateUserDto>): Promise<import("./entities/user.entity").User>;
    remove(id: string): string;
    updateEmail(id: string, body: any, session: any): Promise<import("./entities/user.entity").User>;
}
