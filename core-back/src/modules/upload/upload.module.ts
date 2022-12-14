import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import UploadProvider from '../../providers/upload-provider';

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: 'UploadProvider',
      useClass: UploadProvider,
    },
    UploadService,
  ],
  exports: [UploadService],
})
export class UploadModule {}
