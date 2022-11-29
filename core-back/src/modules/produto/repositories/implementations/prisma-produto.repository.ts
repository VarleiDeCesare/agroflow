import { PrismaService } from './../../../prisma/prisma.service';
import { CreateProdutoDto } from '../../dto/create-produto.dto';
import { UpdateProdutoDto } from '../../dto/update-produto.dto';
import { Produto } from '../../entities/produto.entity';
import IProdutoRepository from '../produto-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProdutoRepository implements IProdutoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateProdutoDto): Promise<Produto> {
    return this.prismaService.produto.create({
      data,
    });
  }

  async findById(id: string): Promise<Produto> {
    return this.prismaService.produto.findUnique({
      where: { id },
      include: {
        tipoProduto: true,
      },
    });
  }

  async findAll(): Promise<Produto[]> {
    return this.prismaService.produto.findMany({
      include: {
        tipoProduto: true,
      },
    });
  }

  async update(id: string, data: UpdateProdutoDto): Promise<Produto> {
    return this.prismaService.produto.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.produto.delete({
      where: { id },
    });
  }
}
