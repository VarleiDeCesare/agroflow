import { ApiProperty } from '@nestjs/swagger';
import { Lavoura as PrismaLavoura } from '@prisma/client';

export class Lavoura implements PrismaLavoura {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty({ required: false })
  descricao: string | null;

  @ApiProperty({ required: false })
  qnt_hectares: number | null;

  @ApiProperty({ required: false })
  localidade: string | null;

  @ApiProperty()
  user_id: string;

  @ApiProperty({ required: false })
  created_at: Date;

  @ApiProperty({ required: false })
  updated_at: Date;
}
