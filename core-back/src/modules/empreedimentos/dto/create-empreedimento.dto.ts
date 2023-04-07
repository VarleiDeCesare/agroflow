import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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

  @ApiProperty()
  @IsDefined()
  @IsDate()
  data_inicio: Date;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsPositive()
  qnt_hectares: number;

  user_id: string;
}
