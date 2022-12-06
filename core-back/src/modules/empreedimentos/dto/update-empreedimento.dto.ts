import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateEmpreedimentoDto } from './create-empreedimento.dto';

export class UpdateEmpreedimentoDto extends PartialType(
  CreateEmpreedimentoDto,
) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome_complementar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  safra_temporada?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cultura_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lavoura_id?: string;
}
