import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  senderEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  receiverEmail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  html: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
