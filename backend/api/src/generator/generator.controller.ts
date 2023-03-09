import { Controller, Get, Post, Req } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Generator')
@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get('email')
  async getEmail(@Req() request: Request) {
    return await this.generatorService.generatePhishingEmail(request.body);
  }
}
