import { BadRequestException, Injectable } from '@nestjs/common';
import * as Mailgen from 'mailgen';
import * as nodemailer from 'nodemailer';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EmailService {
  transporter: nodemailer.Transporter;
  constructor(private readonly authService: AuthService) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async registerEmail(id: number, userEmail: string) {
    try {
      const { token: emailToken, username } =
        await this.authService.generateRegisterToken(id);
      let mailGenerator = new Mailgen({
        theme: 'default',
        product: {
          name: 'wave',
          link: `${process.env.MAILGEN_MAIN_URL}`,
        },
      });

      const email: Mailgen.Content = {
        body: {
          name: username,
          intro: 'Welcome to wave',
          action: {
            instructions: 'to validate your account click here',
            button: {
              color: 'blue',
              text: 'Validate your account',
              link: `${process.env.MAILGEN_SITE_DOMAIN}verification?t=${emailToken}`,
            },
          },
          outro: 'Need Help ?',
        },
      };

      const emailBody = mailGenerator.generate(email);
      const message = {
        from: process.env.NODEMAILER_EMAIL,
        to: userEmail,
        subject: 'Welcome',
        html: emailBody,
      };
      await this.transporter.sendMail(message);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
