import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EmailResponse } from './interfaces/response.interface';
import { EmailDto } from './dto/email.dto';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBody({ type: EmailDto })
  @Post('send')
  async sendEmail(@Body() dto: EmailDto): Promise<EmailResponse> {
    if (!dto) {
      return {
        success: false,
        error: 'Missing parameters',
      };
    }

    return await this.mailService.sendEmail(dto);
  }

  @Post('send/:attackId')
  async sendEmailByAttack(@Param('attackId') attackId: string) {
    return await this.mailService.sendEmailByAttack(attackId);
  }
}
