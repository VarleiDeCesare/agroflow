import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import IUsersRepository from '../users-repository.interface';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        file: true,
      },
    });
  }

  async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
      include: {
        file: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: {
        file: true,
      },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data,
      include: {
        file: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
      include: {
        file: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
