import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import HashProvider from '../../providers/HashProvider';
import MailProvider from '../../providers/MaiProvider';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import authConfig from '../../config/auth.config';
import { JwtStrategy } from './jwt.strategy';
import MailTemplateProvider from '../../providers/MailTemplateProvider';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'HashProvider',
      useClass: HashProvider,
    },
    {
      provide: 'MailProvider',
      useClass: MailProvider,
    },
    {
      provide: 'MailTemplateProvider',
      useClass: MailTemplateProvider,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: authConfig.secret,
      signOptions: { expiresIn: authConfig.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
