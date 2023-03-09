import { Controller, Get, Post, Req } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { Request } from 'express';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get('email')
  getEmail(@Req() request: Request) {
    return this.generatorService.generatePhishingEmail(request.body);
  }
}
