import { JwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import errorsMessage from 'src/errors/errorsMessage';
import { EmpreedimentosService } from './../empreedimentos/empreedimentos.service';
import { ProdutoService } from './../produto/produto.service';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAplicacaoProdutoDto } from './dto/create-aplicacao-produto.dto';
import { UpdateAplicacaoProdutoDto } from './dto/update-aplicacao-produto.dto';
import IAplicacaoProdutoRepository from './repositories/aplicacao-produto-repository.interface';

@Injectable()
export class AplicacaoProdutosService {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly empreendimentoService: EmpreedimentosService,
    @Inject('AplicacaoProdutoRepository')
    private readonly aplicacaoProdutoRepository: IAplicacaoProdutoRepository,
  ) {}
  async create(data: CreateAplicacaoProdutoDto) {
    const { empreendimento_id, produto_id } = data;

    await this.empreendimentoService.findById(empreendimento_id);

    await this.produtoService.findOne(produto_id);

    return this.aplicacaoProdutoRepository.create(data);
  }

  async findAll(user: JwtPayloadDto) {
    return this.aplicacaoProdutoRepository.findAll(user.id);
  }

  async findOne(id: string) {
    const aplicacao = await this.aplicacaoProdutoRepository.findById(id);

    if (!aplicacao) {
      throw new HttpException(
        errorsMessage.APLICACAO_PRODUTO_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return aplicacao;
  }

  async update(id: string, data: UpdateAplicacaoProdutoDto) {
    await this.findOne(id);

    return this.aplicacaoProdutoRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.aplicacaoProdutoRepository.delete(id);
  }
}
