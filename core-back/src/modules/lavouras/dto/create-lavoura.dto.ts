import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';

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

  user_id: string;
}
