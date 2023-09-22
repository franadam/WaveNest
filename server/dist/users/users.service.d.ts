import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findOne(options: Partial<CreateUserDto>): Promise<User | undefined>;
    create(createUserDto: CreateUserDto): Promise<User>;
    save(user: User): Promise<User>;
    clearToken(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOneById(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: number, updateUserDto: Partial<UpdateUserDto>): Promise<User>;
    updateEmail(id: number, email: string): Promise<User>;
    remove(id: number): string;
    hashPassword(password: string): Promise<string>;
    isEmailToken(email: string): Promise<boolean>;
    verifyAccount(userID: string): Promise<User>;
}
