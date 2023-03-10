import { Injectable } from '@nestjs/common';
import { EmailContext } from './interfaces/emailcontext.interface';
import { EmailResponse } from './interfaces/response.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private readonly logger = new Logger(MailService.name);

  async sendEmail(emailContext: EmailContext): Promise<EmailResponse> {
    const { receiverEmail, senderEmail, subject, text } = emailContext;

    this.logger.log(`Sending email to ${receiverEmail}`);

    const htmlFormatted = text.replace(/\n/g, '<br>');

    this.mailerService.sendMail({
      to: receiverEmail,
      from: senderEmail,
      subject,
      html: htmlFormatted,
    });

    return {
      success: true,
    };
  }
}
