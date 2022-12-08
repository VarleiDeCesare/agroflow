import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { CreateAplicacaoProdutoDto } from './create-aplicacao-produto.dto';

export class UpdateAplicacaoProdutoDto extends PartialType(
  CreateAplicacaoProdutoDto,
) {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  empreendimento_id: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  produto_id: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  qnt_produto_por_hec: number;
}
