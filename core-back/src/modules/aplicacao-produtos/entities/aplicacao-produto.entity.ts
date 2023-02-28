import { ApiProperty } from '@nestjs/swagger';

export class AplicacaoProduto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  empreendimento_id: string;

  @ApiProperty()
  produto_id: string;

  @ApiProperty()
  qnt_produto_por_hec: number;

  @ApiProperty()
  valor_unitario: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
