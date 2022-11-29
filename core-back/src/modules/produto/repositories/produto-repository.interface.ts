import { UpdateProdutoDto } from './../dto/update-produto.dto';
import { CreateProdutoDto } from './../dto/create-produto.dto';
import { Produto } from '../entities/produto.entity';

export default interface IProdutoRepository {
  findAll(): Promise<Produto[]>;
  findById(id: string): Promise<Produto | undefined>;
  create(data: CreateProdutoDto): Promise<Produto>;
  update(id: string, data: UpdateProdutoDto): Promise<Produto>;
  delete(id: string): Promise<void>;
}
