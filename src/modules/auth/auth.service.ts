import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import IHashProvider from 'src/providers/HashProvider/hash-provider.interface';
import { addSeconds, isAfter, isBefore } from 'date-fns';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateResponseDto } from './dto/authenticate-response.dto';
import authConfig from 'src/config/auth.config';
import IAuthRepository from './repositories/auth-repository.interface';
import { LoginDataDto } from './dto/login-data.dto';
import { GenerateLoginCodeDto } from './dto/generate-login-code.dto';
import IMailProvider from 'src/providers/MaiProvider/mail.provider.interface';
import { mailConfig } from '../../config/mail.config';
import generateCode from '../../utils/generate-code.utils';
import { ValidateLoginCodeDto } from './dto/validate-login-code.dto';
import errorsMessages from '../../errors/errorsMessage';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetForgotedPasswordDto } from './dto/reset-forgoted-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private readonly jwtService: JwtService,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
    @Inject('AuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('MailProvider')
    private readonly mailProvider: IMailProvider,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger?: LoggerService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.UserService.findByEmail(email);

    if (!user || !user?.password) {
      throw new HttpException(
        errorsMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordMatches = await this.hashProvider.compare(
      pass,
      user.password,
    );

    if (!passwordMatches) {
      throw new HttpException(
        errorsMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    return user;
  }
  public async forgotPassword(data: ForgotPasswordDto) {
    const { email } = data;

    const user = await this.UserService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const forgotPasswordToken = uuidv4();
    const forgotPasswordHashedToken = await this.hashProvider.generateHash(
      forgotPasswordToken,
    );

    await this.authRepository.removeUserSession(user.id);
    await this.authRepository.storageSession({
      email,
      user_id: user.id,
      forgot_password_token: forgotPasswordHashedToken,
      forgot_password_token_expires_at: addSeconds(
        new Date(),
        authConfig.forgotPasswordToken.expiresIn,
      ),
    });

    this.mailProvider.sendMail({
      to: { address: email, name: user?.name },
      from: mailConfig.defaults.from,
      subject: `[${mailConfig.defaults.from.name}] Esqueceu sua senha?`,
      templateData: {
        file: path.resolve(__dirname, 'views', 'forgot_password.hbs'),
        name: 'Esqueceu sua senha?',
        variables: {
          name: user?.name,
          link: `${authConfig.forgotPasswordToken.frontUrl}?token=${forgotPasswordToken}&email=${email}`,
        },
      },
    });
  }

  public async resetForgotedPassword(data: ResetForgotedPasswordDto) {
    const { email, password, passwordConfirmation, token } = data;

    const user = await this.UserService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (password !== passwordConfirmation) {
      throw new HttpException(
        errorsMessages.PASSWORDS_MUST_MATCH,
        HttpStatus.BAD_REQUEST,
      );
    }

    const session = await this.authRepository.recoverUserSession(user.id);

    if (
      !session ||
      !session.forgot_password_token ||
      !session.forgot_password_token_expires_at
    ) {
      throw new HttpException(
        errorsMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const forgotPasswordValidity = new Date(
      session.forgot_password_token_expires_at,
    );
    const forgotTokenExpired = isAfter(new Date(), forgotPasswordValidity);

    if (forgotTokenExpired) {
      throw new HttpException(
        errorsMessages.FORGOT_PASSWORD_TOKEN_EXPIRED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokenMatches = await this.hashProvider.compare(
      token,
      session.forgot_password_token,
    );

    if (!tokenMatches) {
      throw new HttpException(
        errorsMessages.FORGOT_PASSWORD_TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.UserService.resetPassword({ userId: user.id, password });
    await this.authRepository.removeUserSession(user.id);
  }

  public async resetPassword(data: ResetPasswordDto) {
    const { email } = data;

    const user = await this.UserService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const password = await this.UserService.resetPassword({ userId: user.id });

    this.mailProvider.sendMail({
      to: { address: user.email, name: user?.name },
      from: mailConfig.defaults.from,
      subject: `[${mailConfig.defaults.from.name}] Senha resetada`,
      templateData: {
        file: path.resolve(__dirname, 'views', 'reset_password.hbs'),
        name: 'Senha resetada',
        variables: {
          name: user?.name,
          password,
        },
      },
    });
  }

  public async generateLoginCode(data: GenerateLoginCodeDto): Promise<void> {
    const { email } = data;

    let user = await this.UserService.findByEmail(email);

    if (!user) {
      user = await this.UserService.create({
        email,
      });
    }

    const code = generateCode(4);
    const hashedCode = await this.hashProvider.generateHash(code);

    await this.authRepository.removeUserSession(user.id);
    await this.authRepository.storageSession({
      email,
      user_id: user.id,
      login_code: hashedCode,
      login_code_expires_at: addSeconds(
        new Date(),
        authConfig.loginCode.expiresIn,
      ),
    });

    this.mailProvider.sendMail({
      to: { address: user?.email, name: user?.name },
      from: mailConfig.defaults.from,
      subject: `[${mailConfig.defaults.from.name}] Sua Chave de acesso`,
      templateData: {
        file: path.resolve(__dirname, 'views', 'generate_login_code.hbs'),
        name: 'Generate Login Code',
        variables: {
          name: user?.name,
          code,
        },
      },
    });
  }

  public async validateLoginCode(
    data: ValidateLoginCodeDto,
  ): Promise<AuthenticateResponseDto> {
    const { email, code } = data;

    const user = await this.UserService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const session = await this.authRepository.recoverUserSession(user.id);

    if (!session || !session.login_code || !session.login_code_expires_at) {
      throw new HttpException(
        errorsMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const codeValidity = new Date(session.login_code_expires_at);
    const codeIsValid = isBefore(new Date(), codeValidity);

    if (!codeIsValid) {
      throw new HttpException(
        errorsMessages.LOGIN_CODE_EXPIRED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const codeMatches = await this.hashProvider.compare(
      code,
      session.login_code,
    );

    if (!codeMatches) {
      throw new HttpException(
        errorsMessages.LOGIN_CODE_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.login({
      ...data,
      user,
    });
  }

  public async login(data: LoginDataDto): Promise<AuthenticateResponseDto> {
    const { user, ...rest } = data;
    const { email, id: userId } = user;

    const payload: JwtPayloadDto = {
      sub: userId,
      email,
      id: user.id,
    };

    const access_token = this.jwtService.sign(payload);

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: authConfig.refreshToken.expiresIn,
    });

    const hashed_access_token = await this.hashProvider.generateHash(
      access_token,
    );

    const hashed_refresh_token = await this.hashProvider.generateHash(
      refresh_token,
    );

    await this.authRepository.removeUserSession(userId);
    await this.authRepository.storageSession({
      user_id: userId,
      email,
      access_token: hashed_access_token,
      refresh_token: hashed_refresh_token,
      access_token_expires_at: addSeconds(new Date(), authConfig.jwt.expiresIn),
      refresh_token_expires_at: addSeconds(
        new Date(),
        authConfig.refreshToken.expiresIn,
      ),
      ...rest,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  public async logout(userId: string): Promise<void> {
    await this.authRepository.removeUserSession(userId);
  }

  public async logoutAllUsers(): Promise<void> {
    await this.authRepository.removeAllSessions();
  }

  public async logoutUser(id: string): Promise<void> {
    await this.authRepository.removeUserSession(id);
  }
}
