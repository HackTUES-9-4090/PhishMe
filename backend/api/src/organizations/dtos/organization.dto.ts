import { IsString, IsNotEmpty } from 'class-validator';

export class OrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
