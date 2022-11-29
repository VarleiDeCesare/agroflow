import { ApiProperty } from '@nestjs/swagger';
import { TipoProduto as PrismaTipoProduto } from '@prisma/client';
export class TipoProduto implements PrismaTipoProduto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
