import { Injectable } from '@nestjs/common';
import { EmailContext } from './interfaces/emailcontext.interface';
import { EmailResponse } from './interfaces/response.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailContext: EmailContext): Promise<EmailResponse> {
    const { receiverEmail, senderEmail, subject, text, html } = emailContext;

    this.mailerService.sendMail({
      to: receiverEmail,
      from: senderEmail,
      subject,
      text,
      html,
    });

    return {
      success: true,
    };
  }
}
