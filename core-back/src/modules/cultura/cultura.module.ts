import { UploadModule } from './../upload/upload.module';
import { PrismaCulturaRepository } from './repositories/implementations/prisma-cultura.repository';
import { Module } from '@nestjs/common';
import { CulturaService } from './cultura.service';
import { CulturaController } from './cultura.controller';

@Module({
  controllers: [CulturaController],
  providers: [
    CulturaService,
    {
      provide: 'CulturaRepository',
      useClass: PrismaCulturaRepository,
    },
  ],
  exports: [CulturaService],
  imports: [UploadModule],
})
export class CulturaModule {}
