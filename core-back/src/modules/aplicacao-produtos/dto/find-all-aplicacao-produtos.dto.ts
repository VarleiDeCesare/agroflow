import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindAllAplicacaoProduto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  empreendimento_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cultura_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  safra_temporada?: string;
}
