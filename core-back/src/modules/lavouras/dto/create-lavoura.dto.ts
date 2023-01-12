import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class CreateLavouraDto {
  @ApiProperty({ required: false })
  @IsOptional()
  titulo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  descricao?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  qnt_hectares?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  localidade?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  file_id?: string;

  user_id: string;
}
