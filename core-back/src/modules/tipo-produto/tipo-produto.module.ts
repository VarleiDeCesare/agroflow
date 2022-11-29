import { PrismaTipoProdutoRepository } from './repositories/implementations/prisma-tipo-produto.repository';
import { Module } from '@nestjs/common';
import { TipoProdutoService } from './tipo-produto.service';
import { TipoProdutoController } from './tipo-produto.controller';

@Module({
  controllers: [TipoProdutoController],
  providers: [
    TipoProdutoService,
    {
      provide: 'TipoProdutoRepository',
      useClass: PrismaTipoProdutoRepository,
    },
  ],
  exports: [TipoProdutoService],
})
export class TipoProdutoModule {}
