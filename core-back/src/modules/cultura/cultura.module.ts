import { PrismaCulturaRepository } from './repositories/implementations/prisma-cultura.repository';
import { Module } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { CulturaController } from './cultura.controller';

@Module({
  controllers: [CulturaController],
  providers: [
    CulturaService,
    {
      provide: 'CulturaRepository',
      useClass: PrismaCulturaRepository,
    },
  ],
})
export class CulturaModule {}
