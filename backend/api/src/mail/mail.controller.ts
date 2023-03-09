import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
