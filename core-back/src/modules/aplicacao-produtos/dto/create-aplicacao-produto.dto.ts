import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';

export class CreateAplicacaoProdutoDto {
  @ApiProperty()
  @IsUUID()
  @IsDefined()
  empreendimento_id: string;

  @ApiProperty()
  @IsUUID()
  @IsDefined()
  produto_id: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  qnt_produto_por_hec: number;

  user_id: string;
}
