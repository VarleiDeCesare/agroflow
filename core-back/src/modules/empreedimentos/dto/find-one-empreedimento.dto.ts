import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';

export class FindOneEmpreedimentoDto {
  @ApiProperty()
  @IsDefined()
  @IsUUID()
  id: string;
}
