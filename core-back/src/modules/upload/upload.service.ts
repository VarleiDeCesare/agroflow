import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Upload } from './entities/upload.entity';
import IUploadProvider from '../../providers/upload-provider/upload-provider.interface';
import { PrismaService } from '../prisma/prisma.service';
import { Readable } from 'stream';
@Injectable()
export class UploadService {
  constructor(
    @Inject('UploadProvider')
    private readonly uploadProvider: IUploadProvider,
    private readonly prismaService: PrismaService,
  ) {}

  public async create(file: Express.Multer.File): Promise<Upload> {
    const hashedName = `${Date.now()}-${file.originalname.trim()}`;
    await this.uploadProvider.upload({
      buffer: file.buffer,
      mimetype: file.mimetype,
      name: hashedName,
    });
    return this.prismaService.file.create({
      data: {
        name: hashedName,
        mimetype: file.mimetype,
        originalname: file.originalname,
        size: file.size,
      },
    });
  }

  public async findOne(id: string): Promise<Upload> {
    const file = await this.prismaService.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new HttpException('Arquivo não existe', HttpStatus.NOT_FOUND);
    }

    return {
      ...file,
      url: `${process.env.BASE_URL}/file/${encodeURI(file.name)}`,
    };
  }

  private async stringToStream(data: string): Promise<Readable> {
    const stream = new Readable();
    stream.push(Buffer.from(data, 'hex'));
    stream.push(null);
    return stream;
  }

  public async streamFile(
    fileName: string,
  ): Promise<{ stream: Readable; mimetype: string }> {
    const file = await this.prismaService.file.findUnique({
      where: { name: fileName },
    });

    if (!file) {
      throw new HttpException('Arquivo não existe', HttpStatus.NOT_FOUND);
    }

    const uploadedFile = await this.uploadProvider.fileExists(fileName);

    if (!uploadedFile) {
      throw new HttpException('Arquivo não existe', HttpStatus.NOT_FOUND);
    }

    const stream = await this.uploadProvider.get(fileName);

    return {
      stream,
      mimetype: file.mimetype,
    };
  }

  public async remove(id: string): Promise<void> {
    const file = await this.prismaService.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new HttpException('Arquivo não existe', HttpStatus.NOT_FOUND);
    }

    const fileExists = await this.uploadProvider.fileExists(file.name);

    if (fileExists) {
      await this.uploadProvider.delete(file.name);
    }

    await this.prismaService.file.delete({
      where: { id },
    });
  }
}
