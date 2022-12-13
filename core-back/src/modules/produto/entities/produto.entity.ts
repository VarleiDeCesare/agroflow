import { ApiProperty } from '@nestjs/swagger';
import { Produto as PrismaProduto } from 'prisma/prisma-client';
export class Produto implements PrismaProduto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  unidade_medida: string;

  @ApiProperty({ required: false })
  file_id: string | null;

  @ApiProperty()
  tipo_produto_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
