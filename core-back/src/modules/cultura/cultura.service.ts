import errorsMessage from 'src/errors/errorsMessage';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';
import ICulturaRepository from './repositories/cultura-repository.interface';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class CulturaService {
  constructor(
    @Inject('CulturaRepository')
    private readonly culturaRepository: ICulturaRepository,
    private readonly uploadService: UploadService,
  ) {}
  async create(data: CreateCulturaDto) {
    if (data?.file_id) {
      await this.uploadService.findOne(data.file_id);
    }

    return this.culturaRepository.create(data);
  }

  async findAll() {
    return await this.culturaRepository.findAll();
  }

  async findOne(id: string) {
    const cultura = await this.culturaRepository.findById(id);

    if (!cultura) {
      throw new HttpException(
        errorsMessage.CULTURA_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return cultura;
  }

  async update(id: string, data: UpdateCulturaDto) {
    const cultura = await this.findOne(id);

    if (data?.file_id) {
      await this.uploadService.findOne(data.file_id);
      if (cultura?.file_id) {
        await this.uploadService.remove(cultura.file_id);
      }
    }

    return this.culturaRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.culturaRepository.delete(id);
  }
}
