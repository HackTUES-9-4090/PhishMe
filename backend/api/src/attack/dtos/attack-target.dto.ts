import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AttackTargetDto {
  @ApiProperty({
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Optional()
  generatedEmailContent: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  fromMessages: string[];

  @ApiProperty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  toMessages: string[];

  id: string;
}
