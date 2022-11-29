import { TipoProdutoService } from './../tipo-produto/tipo-produto.service';
import errorsMessage from 'src/errors/errorsMessage';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import IProdutoRepository from './repositories/produto-repository.interface';

@Injectable()
export class ProdutoService {
  constructor(
    @Inject('ProdutoRepository')
    private readonly produtoRepository: IProdutoRepository,
    private readonly tipoProdutoService: TipoProdutoService,
  ) {}

  async create(data: CreateProdutoDto) {
    await this.tipoProdutoService.findOne(data.tipo_produto_id);

    return this.produtoRepository.create(data);
  }

  async findAll() {
    return this.produtoRepository.findAll();
  }

  async findOne(id: string) {
    const produto = await this.produtoRepository.findById(id);

    if (!produto) {
      throw new HttpException(
        errorsMessage.PRODUTO_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return produto;
  }

  async update(id: string, data: UpdateProdutoDto) {
    if (data?.tipo_produto_id) {
      await this.tipoProdutoService.findOne(data.tipo_produto_id);
    }

    await this.findOne(id);

    return this.produtoRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.produtoRepository.delete(id);
  }
}
