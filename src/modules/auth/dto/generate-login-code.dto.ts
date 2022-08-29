import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class GenerateLoginCodeDto {
  @ApiProperty()
  @IsDefined()
  @IsEmail()
  email: string;
}
