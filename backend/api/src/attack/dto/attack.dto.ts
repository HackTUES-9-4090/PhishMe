import {
  IsEnum,
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttackTargetDto } from '@/attack/dto';
import { CommunicationType } from '@/attack/enums';

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

  @ApiProperty({ type: () => [AttackTargetDto] })
  @ValidateNested()
  @ArrayNotEmpty()
  targets: AttackTargetDto[];
}
