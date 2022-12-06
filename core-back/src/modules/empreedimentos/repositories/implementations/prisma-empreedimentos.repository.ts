import { FindOneEmpreedimentoDto } from './../../dto/find-one-empreedimento.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateEmpreedimentoDto } from '../../dto/create-empreedimento.dto';
import { UpdateEmpreedimentoDto } from '../../dto/update-empreedimento.dto';
import { Empreedimento } from '../../entities/empreedimento.entity';
import IEmpreedimentosRepository from '../empreedimentos-repository.interface';
import { Prisma } from '@prisma/client';
import { FindAllEmpreedimentoDto } from '../../dto/find-all-empreedimento.dto';

@Injectable()
export class PrismaEmpreedimentosRepository
  implements IEmpreedimentosRepository
{
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(
    userId: string,
    query?: FindAllEmpreedimentoDto,
  ): Promise<Empreedimento[]> {
    const prismaOptions: Prisma.EmpreendimentoFindManyArgs = {
      where: {
        user_id: userId,
      },
      include: {
        lavoura: true,
        cultura: true,
        user: true,
      },
    };

    if (query?.cultura_id) {
      prismaOptions.where.cultura_id = query.cultura_id;
    }

    if (query?.lavoura_id) {
      prismaOptions.where.lavoura_id = query.lavoura_id;
    }

    if (query?.safra_temporada) {
      prismaOptions.where.safra_temporada = query.safra_temporada;
    }

    return this.prismaService.empreendimento.findMany(prismaOptions);
  }
  async create(data: CreateEmpreedimentoDto): Promise<Empreedimento> {
    return this.prismaService.empreendimento.create({
      data,
    });
  }
  async update(
    id: string,
    data: UpdateEmpreedimentoDto,
  ): Promise<Empreedimento> {
    return this.prismaService.empreendimento.update({
      where: { id },
      data,
      include: {
        cultura: true,
        lavoura: true,
        user: true,
      },
    });
  }
  async findById(id: string): Promise<Empreedimento> {
    return this.prismaService.empreendimento.findUnique({
      where: { id },
      include: {
        cultura: true,
        lavoura: true,
      },
    });
  }
  async findByQuery(
    query: FindOneEmpreedimentoDto,
    userId: string,
  ): Promise<Empreedimento> {
    const prismaOptions: Prisma.EmpreendimentoFindFirstArgs = {
      where: {
        user_id: userId,
      },
      include: {
        cultura: true,
        lavoura: true,
        user: true,
      },
    };

    return this.prismaService.empreendimento.findFirst(prismaOptions);
  }
  async remove(id: string): Promise<void> {
    await this.prismaService.empreendimento.delete({
      where: { id },
    });
  }
}
