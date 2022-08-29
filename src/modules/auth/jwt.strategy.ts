import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import authConfig from 'src/config/auth.config';
import IAuthRepository from './repositories/auth-repository.interface';
import IHashProvider from 'src/providers/HashProvider/hash-provider.interface';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtPayloadDto) {
    const rawToken = req.headers['authorization'].split(' ')[1];

    const auth = await this.authRepository.recoverUserSession(payload.sub);

    if (!auth || !auth.access_token) return false;

    const tokenMatches = await this.hashProvider.compare(
      rawToken,
      auth.access_token,
    );

    if (!tokenMatches) return false;

    return payload;
  }
}
