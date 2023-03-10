import { Controller, Get, Body } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { ApiTags } from '@nestjs/swagger';
import { AttackDto } from '@/attack/dtos';

@ApiTags('Generator')
@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get('email')
  async getEmail(@Body() dto: AttackDto) {
    return await this.generatorService.generatePhishingEmail({
      attack: dto,
      target: dto.targets[0],
    });
  }
}
