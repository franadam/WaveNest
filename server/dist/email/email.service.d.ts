import * as nodemailer from 'nodemailer';
import { AuthService } from '../auth/auth.service';
export declare class EmailService {
    private readonly authService;
    transporter: nodemailer.Transporter;
    constructor(authService: AuthService);
    registerEmail(id: number, userEmail: string): Promise<boolean>;
}
