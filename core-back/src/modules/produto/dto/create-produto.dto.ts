import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  nome: string;

  @ApiProperty()
  @IsString()
  @IsDefined()
  unidade_medida: string;

  @ApiProperty()
  @IsUUID()
  @IsDefined()
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
