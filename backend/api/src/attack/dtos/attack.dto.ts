import {
  IsUrl,
  IsEnum,
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommunicationType } from '@/attack/enums';
import { AttackTargetDto } from '.';
import { Type } from 'class-transformer';

export class AttackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: CommunicationType,
  })
  @IsEnum(CommunicationType)
  @IsNotEmpty()
  communicationType: CommunicationType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromRelationship: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  scrapeUrl?: string;

  @ApiProperty({ type: () => [AttackTargetDto] })
  @Type(() => AttackTargetDto)
  @ValidateNested()
  @ArrayNotEmpty()
  targets: AttackTargetDto[];
}
