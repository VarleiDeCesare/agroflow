import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
