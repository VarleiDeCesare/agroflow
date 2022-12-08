import { CulturaModule } from './../cultura/cultura.module';
import { LavourasModule } from './../lavouras/lavouras.module';
import { PrismaEmpreedimentosRepository } from './repositories/implementations/prisma-empreedimentos.repository';
import { Module } from '@nestjs/common';
import { EmpreedimentosService } from './empreedimentos.service';
import { EmpreedimentosController } from './empreedimentos.controller';

@Module({
  controllers: [EmpreedimentosController],
  providers: [
    EmpreedimentosService,
    {
      provide: 'EmpreendimentosRepository',
      useClass: PrismaEmpreedimentosRepository,
    },
  ],
  imports: [LavourasModule, CulturaModule],
  exports: [EmpreedimentosService],
})
export class EmpreedimentosModule {}
