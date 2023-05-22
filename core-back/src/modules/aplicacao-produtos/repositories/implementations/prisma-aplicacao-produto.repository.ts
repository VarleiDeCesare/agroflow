import { UpdateAplicacaoProdutoDto } from './../../dto/update-aplicacao-produto.dto';
import { AplicacaoProduto } from './../../entities/aplicacao-produto.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import IAplicacaoProdutoRepository from '../aplicacao-produto-repository.interface';
import { CreateAplicacaoProdutoDto } from '../../dto/create-aplicacao-produto.dto';
import { Prisma } from '@prisma/client';
import { FindAllAplicacaoProduto } from '../../dto/find-all-aplicacao-produtos.dto';

@Injectable()
export class PrismaAplicacaoProdutoRepository
  implements IAplicacaoProdutoRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateAplicacaoProdutoDto): Promise<AplicacaoProduto> {
    return this.prismaService.aplicacaoProduto.create({
      data,
      include: {
        empreedimento: true,
        produto: {
          include: {
            tipoProduto: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<AplicacaoProduto> {
    return this.prismaService.aplicacaoProduto.findUnique({
      where: { id },
      include: {
        empreedimento: true,
        produto: {
          include: {
            tipoProduto: true,
          },
        },
      },
    });
  }

  async findAll(
    userId: string,
    query?: FindAllAplicacaoProduto,
  ): Promise<AplicacaoProduto[]> {
    const prismaOptions: Prisma.AplicacaoProdutoFindManyArgs = {
      include: {
        empreedimento: true,
        produto: {
          include: {
            tipoProduto: true,
          },
        },
      },
      where: {
        user_id: userId,
      },
    };

    if (query?.empreendimento_id) {
      prismaOptions.where.empreendimento_id = query.empreendimento_id;
    }

    if (query?.cultura_id) {
      prismaOptions.where.empreedimento =
        prismaOptions.where.empreedimento || {};
      prismaOptions.where.empreedimento.cultura_id = query.cultura_id;
    }

    if (query?.safra_temporada) {
      prismaOptions.where.empreedimento =
        prismaOptions.where.empreedimento || {};
      prismaOptions.where.empreedimento.safra_temporada = query.safra_temporada;
    }

    return this.prismaService.aplicacaoProduto.findMany(prismaOptions);
  }

  async update(
    id: string,
    data: UpdateAplicacaoProdutoDto,
  ): Promise<AplicacaoProduto> {
    return this.prismaService.aplicacaoProduto.update({
      where: { id },
      data,
      include: {
        empreedimento: true,
        produto: {
          include: {
            tipoProduto: true,
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.aplicacaoProduto.delete({
      where: { id },
    });
  }
}
