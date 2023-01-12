import { UploadModule } from './../upload/upload.module';
import { PrismaLavouraRepository } from './repositories/implementations/prisma-lavoura.repository';
import { Module } from '@nestjs/common';
import { LavourasService } from './lavouras.service';
import { LavourasController } from './lavouras.controller';

@Module({
  controllers: [LavourasController],
  providers: [
    LavourasService,
    {
      provide: 'LavourasRepository',
      useClass: PrismaLavouraRepository,
    },
  ],
  exports: [LavourasService],
  imports: [UploadModule],
})
export class LavourasModule {}
