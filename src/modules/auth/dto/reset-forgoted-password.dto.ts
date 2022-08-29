import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import errorsMessages from 'src/errors/errorsMessages';

export class ResetForgotedPasswordDto {
  @ApiProperty()
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: errorsMessages.PASSWORD_TOO_WEAK,
  })
  @IsDefined()
  password: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  passwordConfirmation: string;
}
