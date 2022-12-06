import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllEmpreedimentoDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  lavoura_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cultura_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  safra_temporada?: string;
}
