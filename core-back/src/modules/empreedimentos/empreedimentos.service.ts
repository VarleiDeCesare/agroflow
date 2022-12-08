import { LavourasService } from './../lavouras/lavouras.service';
import { CulturaService } from './../cultura/cultura.service';
import { FindAllEmpreedimentoDto } from './dto/find-all-empreedimento.dto';
import errorsMessage from 'src/errors/errorsMessage';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEmpreedimentoDto } from './dto/create-empreedimento.dto';
import { UpdateEmpreedimentoDto } from './dto/update-empreedimento.dto';
import IEmpreedimentosRepository from './repositories/empreedimentos-repository.interface';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';

@Injectable()
export class EmpreedimentosService {
  constructor(
    @Inject('EmpreendimentosRepository')
    private readonly empreedimentosRepository: IEmpreedimentosRepository,
    private readonly culturaService: CulturaService,
    private readonly lavouraService: LavourasService,
  ) {}
  async create(user: JwtPayloadDto, data: CreateEmpreedimentoDto) {
    const { safra_temporada, lavoura_id, cultura_id } = data;
    data.user_id = user.id;
    await this.culturaService.findOne(data.cultura_id);
    await this.lavouraService.findOne(data.lavoura_id);

    const empreedimentoAlreadyExists =
      await this.empreedimentosRepository.findByQuery(
        { cultura_id, lavoura_id, safra_temporada },
        user.id,
      );

    if (empreedimentoAlreadyExists) {
      throw new HttpException(
        errorsMessage.EMPREEDIMENTO_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }
    return this.empreedimentosRepository.create(data);
  }

  async findAll(user: JwtPayloadDto, query: FindAllEmpreedimentoDto) {
    return this.empreedimentosRepository.findAll(user.id, query);
  }

  async findById(id: string) {
    const empreedimento = await this.empreedimentosRepository.findById(id);

    if (!empreedimento) {
      throw new HttpException(
        errorsMessage.EMPREEDIMENTO_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return empreedimento;
  }

  async update(id: string, data: UpdateEmpreedimentoDto) {
    if (data?.cultura_id) {
      await this.culturaService.findOne(data.cultura_id);
    }

    if (data?.lavoura_id) {
      await this.lavouraService.findOne(data.lavoura_id);
    }

    await this.findById(id);

    return this.empreedimentosRepository.update(id, data);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.empreedimentosRepository.remove(id);
  }
}
