import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateCulturaDto } from './create-cultura.dto';

export class UpdateCulturaDto extends PartialType(CreateCulturaDto) {
  @ApiProperty()
  @IsString()
  @IsDefined()
  nome: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  file_id?: string;
}
