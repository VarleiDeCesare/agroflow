import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
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
})
export class UserModule {}
