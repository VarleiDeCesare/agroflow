import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/users/user.controller';
import { LavourasModule } from './modules/lavouras/lavouras.module';
import { TipoProdutoModule } from './modules/tipo-produto/tipo-produto.module';
import { CulturaModule } from './modules/cultura/cultura.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { EmpreedimentosModule } from './modules/empreedimentos/empreedimentos.module';
import { AplicacaoProdutosModule } from './modules/aplicacao-produtos/aplicacao-produtos.module';

//FIXME: Implementar módulo de upload e colocar relação com o usuário, lavoura, cultura e produto.
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    LavourasModule,
    TipoProdutoModule,
    CulturaModule,
    ProdutoModule,
    EmpreedimentosModule,
    AplicacaoProdutosModule,
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
