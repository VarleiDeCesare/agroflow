import { JwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateLavouraDto } from './dto/create-lavoura.dto';
import { UpdateLavouraDto } from './dto/update-lavoura.dto';
import { Lavoura } from './entities/lavoura.entity';
import ILavourasRepository from './repositories/lavoura-repository.interface';
import errorsMessages from '../../errors/errorsMessage';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class LavourasService {
  constructor(
    @Inject('LavourasRepository')
    private readonly lavourasRepository: ILavourasRepository,
    private readonly uploadService: UploadService,
  ) {}
  async create(user: JwtPayloadDto, data: CreateLavouraDto): Promise<Lavoura> {
    if (data?.file_id) {
      await this.uploadService.findOne(data.file_id);
    }

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
    const lavoura = await this.findOne(id);

    if (data?.file_id) {
      await this.uploadService.findOne(data.file_id);
      if (lavoura?.file_id) {
        await this.uploadService.remove(lavoura.file_id);
      }
    }

    return this.lavourasRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.lavourasRepository.delete(id);
  }
}
