import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTipoProdutoDto } from './dto/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from './dto/update-tipo-produto.dto';
import ITipoProdutoRepository from './repositories/tipo-produto-repository.interface';
import errorsMessage from 'src/errors/errorsMessage';
@Injectable()
export class TipoProdutoService {
  constructor(
    @Inject('TipoProdutoRepository')
    private readonly tipoProdutoRepo: ITipoProdutoRepository,
  ) {}
  async create(data: CreateTipoProdutoDto) {
    return this.tipoProdutoRepo.create(data);
  }

  async findAll() {
    return this.tipoProdutoRepo.findAll();
  }

  async findOne(id: string) {
    const tipoProduto = await this.tipoProdutoRepo.findById(id);

    if (!tipoProduto) {
      throw new HttpException(
        errorsMessage.TIPO_PRODUTO_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(id: string, data: UpdateTipoProdutoDto) {
    await this.findOne(id);

    return this.tipoProdutoRepo.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.tipoProdutoRepo.delete(id);
  }
}
