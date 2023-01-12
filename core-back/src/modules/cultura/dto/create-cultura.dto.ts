import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCulturaDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  nome: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  file_id?: string;
}
