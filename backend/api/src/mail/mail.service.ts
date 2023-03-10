import { Injectable } from '@nestjs/common';
import { EmailContext } from './interfaces/emailcontext.interface';
import { EmailResponse } from './interfaces/response.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from '@nestjs/common';
import { AttackService } from '@/attack/attack.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly attackService: AttackService,
  ) {}

  private readonly logger = new Logger(MailService.name);

  async sendEmail(emailContext: EmailContext): Promise<EmailResponse> {
    const { receiverEmail, subject, text } = emailContext;

    this.logger.log(`Sending email to ${receiverEmail}`);

    const htmlFormatted = text.replace(/\n/g, '<br>');

    this.mailerService.sendMail({
      to: receiverEmail,
      from: 'noreply @ tuesplace <noreply@tuesplace.com>',
      subject,
      html: htmlFormatted,
    });

    return {
      success: true,
    };
  }

  async sendEmailByAttack(attackId: string) {
    const attack = await this.attackService.findOne(attackId);

    for (const target of attack.targets) {
      const emailContext = {
        receiverEmail: target.email,
        subject: `${target.name}, It's ${attack.fromName}`,
        text: target.generatedEmailContent,
        html: target.generatedEmailContent,
      };

      await this.sendEmail(emailContext);
    }

    return attackId;
  }
}
