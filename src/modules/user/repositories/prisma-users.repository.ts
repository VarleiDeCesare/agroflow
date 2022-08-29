import IUsersRepository from './users-repository.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async delete(email: string): Promise<void> {
    this.prismaService.user.delete({
      where: { email },
    });
  }
}
