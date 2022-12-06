import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User as UserEntity } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import errorsMessages from '../../errors/errorsMessage';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    //FIXME: Apenas para dev
    return {
      token: this.jwtService.sign(payload, {
        expiresIn: '30d',
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        errorsMessages.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        errorsMessages.LOGIN_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }
}
