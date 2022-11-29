import { CreateCulturaDto } from './../dto/create-cultura.dto';
import { UpdateCulturaDto } from './../dto/update-cultura.dto';
import { Cultura } from './../entities/cultura.entity';
export default interface ICulturaRepository {
  findAll(): Promise<Cultura[]>;
  findById(id: string): Promise<Cultura | undefined>;
  create(data: CreateCulturaDto): Promise<Cultura>;
  update(id: string, data: UpdateCulturaDto): Promise<Cultura>;
  delete(id: string): Promise<void>;
}
