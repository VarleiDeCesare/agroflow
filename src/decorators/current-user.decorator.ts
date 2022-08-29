import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from 'src/modules/auth/dto/jwt-payload.dto';

export const CurrentUser = createParamDecorator<JwtPayloadDto>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
