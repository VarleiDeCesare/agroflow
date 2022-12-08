import { CreateAplicacaoProdutoDto } from '../dto/create-aplicacao-produto.dto';
import { UpdateAplicacaoProdutoDto } from './../dto/update-aplicacao-produto.dto';
import { AplicacaoProduto } from './../entities/aplicacao-produto.entity';

export default interface IAplicacaoProdutoRepository {
  findAll(userId: string): Promise<AplicacaoProduto[]>;
  findById(id: string): Promise<AplicacaoProduto | undefined>;
  create(data: CreateAplicacaoProdutoDto): Promise<AplicacaoProduto>;
  update(
    id: string,
    data: UpdateAplicacaoProdutoDto,
  ): Promise<AplicacaoProduto>;
  delete(id: string): Promise<void>;
}
