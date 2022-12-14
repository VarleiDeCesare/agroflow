import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLavouraDto } from '../../dto/create-lavoura.dto';
import { UpdateLavouraDto } from '../../dto/update-lavoura.dto';
import { Lavoura } from '../../entities/lavoura.entity';
import ILavourasRepository from '../lavoura-repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaLavouraRepository implements ILavourasRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(userId: string): Promise<Lavoura[]> {
    return this.prismaService.lavoura.findMany({
      where: {
        user_id: userId,
      },
      include: {
        file: true,
      },
    });
  }

  async findById(id: string): Promise<Lavoura> {
    return this.prismaService.lavoura.findUnique({
      where: {
        id,
      },
      include: {
        file: true,
      },
    });
  }

  async create(data: CreateLavouraDto): Promise<Lavoura> {
    return this.prismaService.lavoura.create({
      data,
      include: {
        file: true,
      },
    });
  }

  async update(id: string, data: UpdateLavouraDto): Promise<Lavoura> {
    return this.prismaService.lavoura.update({
      where: { id },
      data,
      include: {
        file: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.lavoura.delete({
      where: { id },
    });
  }
}
