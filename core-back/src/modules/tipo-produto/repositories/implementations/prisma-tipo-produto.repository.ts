import { CreateTipoProdutoDto } from './../../dto/create-tipo-produto.dto';
import { TipoProduto } from './../../entities/tipo-produto.entity';
import ITipoProdutoRepository from '../tipo-produto-repository.interface';
import { Injectable } from '@nestjs/common';
import { UpdateTipoProdutoDto } from '../../dto/update-tipo-produto.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PrismaTipoProdutoRepository implements ITipoProdutoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<TipoProduto[]> {
    return this.prismaService.tipoProduto.findMany();
  }

  async findById(id: string): Promise<TipoProduto> {
    return this.prismaService.tipoProduto.findUnique({
      where: { id },
    });
  }

  async create(data: CreateTipoProdutoDto): Promise<TipoProduto> {
    return this.prismaService.tipoProduto.create({ data });
  }

  async update(id: string, data: UpdateTipoProdutoDto): Promise<TipoProduto> {
    return this.prismaService.tipoProduto.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaService.tipoProduto.delete({
      where: { id },
    });
  }
}
