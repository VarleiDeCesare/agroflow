import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateProdutoDto } from './create-produto.dto';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  unidade_medida: string;

  @ApiProperty()
  @IsOptional()
  tipo_produto_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  descricao: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  file_id?: string;
}
