import { Controller, Get } from '@nestjs/common';

@Controller('mail')
export class MailController {
  @Get('test')
  getTest() {
    return 'test12';
  }
}
