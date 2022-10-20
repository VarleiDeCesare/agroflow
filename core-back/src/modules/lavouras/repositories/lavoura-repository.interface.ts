import { UpdateLavouraDto } from '../dto/update-lavoura.dto';
import { CreateLavouraDto } from '../dto/create-lavoura.dto';
import { Lavoura } from '../entities/lavoura.entity';

export default interface ILavourasRepository {
  findAll(userId: string): Promise<Lavoura[]>;
  findById(id: string): Promise<Lavoura | undefined>;
  create(data: CreateLavouraDto): Promise<Lavoura>;
  update(id: string, data: UpdateLavouraDto): Promise<Lavoura>;
  delete(id: string): Promise<void>;
}
