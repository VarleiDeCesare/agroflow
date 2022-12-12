import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class CreateUploadDto {
  @IsDefined()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
