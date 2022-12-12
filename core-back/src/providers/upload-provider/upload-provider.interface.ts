import { Readable } from 'stream';
import { CreateUploadDto } from './dto/create-upload.dto';

export default interface IUploadProvider {
  upload(file: CreateUploadDto): Promise<void>;
  delete(fileName: string): Promise<void>;
  get(fileName: string): Promise<Readable>;
  fileExists(fileName: string): Promise<boolean>;
}
