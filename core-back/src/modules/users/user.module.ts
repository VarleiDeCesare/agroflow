import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUsersRepository } from './repositories/implementations/prisma-users.repository';
import HashProvider from 'src/providers/HashProvider';

@Module({
  controllers: [UserController],

  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: PrismaUsersRepository,
    },
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
  ],
  exports: [UserService],
  imports: [UploadModule],
})
export class UserModule {}
