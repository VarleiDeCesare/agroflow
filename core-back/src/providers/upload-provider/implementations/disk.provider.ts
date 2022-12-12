import { Injectable } from '@nestjs/common';
import { F_OK } from 'constants';
import {
  access,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  ReadStream,
  unlink,
} from 'fs';
import uploadConfig from '../../../config/upload.config';
import { Readable } from 'stream';
import { CreateUploadDto } from '../dto/create-upload.dto';
import IUploadProvider from '../upload-provider.interface';

@Injectable()
class DiskUploadProvider implements IUploadProvider {
  public async upload(file: CreateUploadDto): Promise<void> {
    return new Promise((resolve, reject) => {
      const readableStream = Readable.from(file.buffer);
      const dir = uploadConfig.disk.destination;

      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      const writableStream = createWriteStream(
        `${uploadConfig.disk.destination}/${file.name}`,
      );

      const piping = readableStream.pipe(writableStream);

      piping.on('close', resolve);
      piping.on('error', reject);
    });
  }

  public async delete(fileName: string): Promise<void> {
    return new Promise((resolve) => {
      const path = `${uploadConfig.disk.destination}/${fileName}`;
      unlink(path, () => resolve());
    });
  }

  public async get(fileName: string): Promise<ReadStream> {
    const path = `${uploadConfig.disk.destination}/${fileName}`;

    const dir = uploadConfig.disk.destination;

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    return createReadStream(path);
  }

  public async fileExists(fileName: string): Promise<boolean> {
    const path = `${uploadConfig.disk.destination}/${fileName}`;
    const fileExists = await new Promise((resolve) => {
      access(path, F_OK, (err) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });

    return fileExists as boolean;
  }
}

export default DiskUploadProvider;
