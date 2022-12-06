import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmpreedimentoDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome_complementar?: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  safra_temporada: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsUUID()
  lavoura_id: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsUUID()
  cultura_id: string;

  user_id: string;
}
