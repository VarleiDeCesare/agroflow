import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class CreateTipoProdutoDto {
  @ApiProperty()
  @IsDefined()
  nome: string;
}
