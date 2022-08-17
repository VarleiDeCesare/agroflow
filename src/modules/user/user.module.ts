import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersRepository } from './repositories/prisma-users-interface';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}
