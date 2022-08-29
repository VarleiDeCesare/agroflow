import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  refresh_token: string;

  deviceId?: string;

  os?: string;

  version?: string;
}
