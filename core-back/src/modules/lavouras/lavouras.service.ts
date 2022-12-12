import { JwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLavouraDto } from './dto/create-lavoura.dto';
import { UpdateLavouraDto } from './dto/update-lavoura.dto';
import { Lavoura } from './entities/lavoura.entity';
import ILavourasRepository from './repositories/lavoura-repository.interface';
import errorsMessages from '../../errors/errorsMessage';
@Injectable()
export class LavourasService {
  constructor(
    @Inject('LavourasRepository')
    private readonly lavourasRepository: ILavourasRepository,
  ) {}
  async create(user: JwtPayloadDto, data: CreateLavouraDto): Promise<Lavoura> {
    //FIXME: Criar regra para file_id
    data.user_id = user.id;
    return this.lavourasRepository.create(data);
  }

  async findAll(userId: string): Promise<Lavoura[]> {
    return this.lavourasRepository.findAll(userId);
  }

  async findOne(id: string): Promise<Lavoura> {
    const lavoura = await this.lavourasRepository.findById(id);

    if (!lavoura) {
      throw new HttpException(
        errorsMessages.LAVOURA_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return lavoura;
  }

  async update(id: string, data: UpdateLavouraDto) {
    //FIXME: Criar regra para file_id
    await this.findOne(id);

    return this.lavourasRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.lavourasRepository.delete(id);
  }
}
