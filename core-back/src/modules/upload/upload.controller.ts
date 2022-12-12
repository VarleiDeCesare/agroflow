import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Upload } from './entities/upload.entity';
import { Response } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from '../../providers/upload-provider/dto/create-upload.dto';

@ApiTags('Upload')
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 1 * 1024 * 1024, // 1MB permitido
      },
      fileFilter: (_, file, cb) => {
        const extensionsAllowed = ['jpg', 'jpeg', 'webp', 'gif', 'png'];
        const [type, extension] = file.mimetype.split('/');
        if (!extensionsAllowed.includes(extension)) {
          cb(
            new HttpException(
              `${extension} não permitido, use uma das seguintes extensões: ${extensionsAllowed}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
          return;
        }
        if (type !== 'image') {
          cb(
            new HttpException(
              'Apenas imagens são permitidas',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
          return;
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Body para fazer upload',
    type: CreateUploadDto,
  })
  public async create(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Upload> {
    return this.uploadService.create(file);
  }

  @Get('upload/:id')
  public async findOne(@Param('id') id: string): Promise<Upload> {
    return this.uploadService.findOne(id);
  }

  @Get('file/:fileName')
  public async streamFile(
    @Param('fileName') fileName: string,
    @Res() response: Response,
  ): Promise<void> {
    const { stream, mimetype } = await this.uploadService.streamFile(fileName);
    response.setHeader('Content-Type', mimetype);
    response.setHeader('Cache-Control', 'public, max-age=518000');
    stream.pipe(response);
  }

  @Delete('upload/:id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this.uploadService.remove(id);
  }
}
