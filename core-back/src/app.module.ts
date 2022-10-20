import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AuthController } from './modules/auth/auth.controller';
import { UserController } from './modules/users/user.controller';
import { LavourasModule } from './modules/lavouras/lavouras.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    AuthModule,
    LavourasModule,
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
