import { PrismaProdutoRepository } from './repositories/implementations/prisma-produto.repository';
import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TipoProdutoModule } from '../tipo-produto/tipo-produto.module';

@Module({
  controllers: [ProdutoController],
  providers: [
    ProdutoService,
    {
      provide: 'ProdutoRepository',
      useClass: PrismaProdutoRepository,
    },
  ],
  imports: [TipoProdutoModule],
  exports: [ProdutoService],
})
export class ProdutoModule {}
