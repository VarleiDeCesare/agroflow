import { UpdateTipoProdutoDto } from './../dto/update-tipo-produto.dto';
import { CreateTipoProdutoDto } from './../dto/create-tipo-produto.dto';
import { TipoProduto } from './../entities/tipo-produto.entity';
export default interface ITipoProdutoRepository {
  findAll(): Promise<TipoProduto[]>;
  findById(id: string): Promise<TipoProduto | undefined>;
  create(data: CreateTipoProdutoDto): Promise<TipoProduto>;
  update(id: string, data: UpdateTipoProdutoDto): Promise<TipoProduto>;
  delete(id: string): Promise<void>;
}
