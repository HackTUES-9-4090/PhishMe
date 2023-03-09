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
import { UserDto } from './dtos';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBody({ type: UserDto })
  @Post()
  async create(@Body() dto: UserDto) {
    return await this.usersService.create(dto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @ApiBody({ type: UserDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UserDto) {
    return await this.usersService.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
