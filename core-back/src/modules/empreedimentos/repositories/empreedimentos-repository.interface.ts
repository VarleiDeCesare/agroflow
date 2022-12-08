import { FindOneEmpreedimentoDto } from './../dto/find-one-empreedimento.dto';
import { UpdateEmpreedimentoDto } from './../dto/update-empreedimento.dto';
import { Empreedimento } from '../entities/empreedimento.entity';
import { CreateEmpreedimentoDto } from './../dto/create-empreedimento.dto';
import { FindAllEmpreedimentoDto } from '../dto/find-all-empreedimento.dto';
export default interface IEmpreedimentosRepository {
  create(data: CreateEmpreedimentoDto): Promise<Empreedimento>;
  update(id: string, data: UpdateEmpreedimentoDto): Promise<Empreedimento>;
  findById(id: string): Promise<Empreedimento | null>;
  findAll(
    userId: string,
    query?: FindAllEmpreedimentoDto,
  ): Promise<Empreedimento[]>;
  findByQuery(
    query: FindAllEmpreedimentoDto,
    userId: string,
  ): Promise<Empreedimento | null>;
  remove(id: string): Promise<void>;
}
