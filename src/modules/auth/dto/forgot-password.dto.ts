import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;
}
