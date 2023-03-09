import {
  IsUrl,
  IsEnum,
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommunicationType } from '@/attack/enums';
import { AttackTargetDto } from '.';

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
  from: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  theme: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  fakeUrl: string;

  @ApiProperty({ type: () => [AttackTargetDto] })
  @ValidateNested()
  @ArrayNotEmpty()
  targets: AttackTargetDto[];
}
