import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(user: User): Promise<User>;
    googleLogin(req: Request): User;
    googleCallback(req: Request): Promise<User>;
    googleRegister(req: Request): Promise<User>;
    logout(user: User): Promise<User>;
    getAuthToken(userID: number): Promise<string>;
    loginJWT(email: string, password: string): Promise<User>;
    generateAuthToken(userID: number): Promise<string>;
    generateRegisterToken(userID: number): Promise<{
        token: string;
        username: string;
    }>;
    comparePassword(password: string, hashedPassword: string): Promise<true>;
    validateUser(email: string, password: string): Promise<any>;
    validateToken(token: string): Promise<any>;
}
