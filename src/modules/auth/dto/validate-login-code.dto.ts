import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class ValidateLoginCodeDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  code: string;

  deviceId?: string;
  os?: string;
  version?: string;
}
