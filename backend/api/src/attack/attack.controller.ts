import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AttackService } from './attack.service';
import { AttackDto } from './dtos';

@ApiTags('Attack')
@Controller('attack')
export class AttackController {
  constructor(private readonly attackService: AttackService) {}

  @ApiBody({ type: AttackDto })
  @Post()
  async create(@Body() dto: AttackDto) {
    return await this.attackService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.attackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.attackService.findOne(+id);
  }

  @ApiBody({ type: AttackDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: AttackDto) {
    return await this.attackService.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.attackService.delete(+id);
  }
}
