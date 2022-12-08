import { EmpreedimentosModule } from './../empreedimentos/empreedimentos.module';
import { ProdutoModule } from './../produto/produto.module';
import { Module } from '@nestjs/common';
import { AplicacaoProdutosService } from './aplicacao-produtos.service';
import { AplicacaoProdutosController } from './aplicacao-produtos.controller';
import { PrismaAplicacaoProdutoRepository } from './repositories/implementations/prisma-aplicacao-produto.repository';

@Module({
  controllers: [AplicacaoProdutosController],
  providers: [
    AplicacaoProdutosService,
    {
      provide: 'AplicacaoProdutoRepository',
      useClass: PrismaAplicacaoProdutoRepository,
    },
  ],
  imports: [ProdutoModule, EmpreedimentosModule],
})
export class AplicacaoProdutosModule {}
