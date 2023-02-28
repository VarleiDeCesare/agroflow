import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FindAllAplicacaoProduto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  empreendimento_id?: string;
}
