import { ApiProperty } from '@nestjs/swagger';
import { Empreedimento as PrismaEmpreendimento } from 'prisma/build';
export class Empreedimento implements PrismaEmpreendimento {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome_complementar: string;

  @ApiProperty()
  safra_temporada: string;

  @ApiProperty()
  cultura_id: string;

  @ApiProperty()
  lavoura_id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
