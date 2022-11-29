import { ApiProperty } from '@nestjs/swagger';
import { Cultura as PrismaCultura } from '@prisma/client';
export class Cultura implements PrismaCultura {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
