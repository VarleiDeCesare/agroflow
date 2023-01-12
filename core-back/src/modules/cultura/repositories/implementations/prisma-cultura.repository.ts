import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCulturaDto } from '../../dto/create-cultura.dto';
import { UpdateCulturaDto } from '../../dto/update-cultura.dto';
import { Cultura } from '../../entities/cultura.entity';
import ICulturaRepository from '../cultura-repository.interface';

@Injectable()
export class PrismaCulturaRepository implements ICulturaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Cultura[]> {
    return this.prismaService.cultura.findMany({
      include: {
        file: true,
      },
    });
  }

  async findById(id: string): Promise<Cultura> {
    return this.prismaService.cultura.findUnique({
      where: { id },
      include: {
        file: true,
      },
    });
  }

  async create(data: CreateCulturaDto): Promise<Cultura> {
    return this.prismaService.cultura.create({
      data,
      include: {
        file: true,
      },
    });
  }

  async update(id: string, data: UpdateCulturaDto): Promise<Cultura> {
    return this.prismaService.cultura.update({
      where: { id },
      data,
      include: {
        file: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    this.prismaService.cultura.delete({
      where: { id },
    });
  }
}
