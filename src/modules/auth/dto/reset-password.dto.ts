import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;
}
