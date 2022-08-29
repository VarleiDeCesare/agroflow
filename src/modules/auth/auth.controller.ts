import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { DeviceHeaders } from '../../decorators/device-headers.decorator';
import { Public } from '../../decorators/public.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { DefaultRoles } from '../acl/enum/default-roles.enum';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticateResponseDto } from './dto/authenticate-response.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { GenerateLoginCodeDto } from './dto/generate-login-code.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ValidateLoginCodeDto } from './dto/validate-login-code.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@DeviceHeaders()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Autenticação Email e senha' })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    type: AuthenticateResponseDto,
    description: 'Usuário autenticado',
  })
  @ApiUnauthorizedResponse({
    description: 'Usuário ou senha incorretas',
  })
  @Public()
  @Post('login')
  async login(
    // Único cenário que vem todos dados do user
    @CurrentUser() user: User,
    @Body() authenticateDto: AuthenticateDto,
    @Headers() headers: any,
  ): Promise<AuthenticateResponseDto> {
    return this.authService.login({
      user,
      deviceId: headers?.deviceId,
      os: headers?.deviceId,
      version: headers?.version,
    });
  }

  @ApiOperation({ summary: 'Logout do usuário' })
  @ApiNoContentResponse({
    description: 'Usuário deslogado',
  })
  @ApiBearerAuth()
  @Post('logout')
  public async logout(@CurrentUser() user: JwtPayloadDto) {
    await this.authService.logout(user.id);
  }

  @ApiOperation({ summary: 'Deslogar um user específico' })
  @ApiNoContentResponse({
    description: 'Usuário deslogado',
  })
  @ApiBearerAuth()
  @Roles(DefaultRoles.SYSADMIN)
  @Post('logout-user/:id')
  public async logoutUser(@Param('id') id: string) {
    this.authService.logoutUser(id);
  }

  @ApiOperation({ summary: 'Desloga todos usuários da base' })
  @ApiNoContentResponse({
    description: 'Usuários deslogados',
  })
  @ApiBearerAuth()
  @Roles(DefaultRoles.SYSADMIN)
  @Post('logout-all-users')
  public async logoutAllUsers() {
    await this.authService.logoutAllUsers();
  }

  @ApiOperation({ summary: 'Envia via email o código de login' })
  @ApiNoContentResponse({
    description: 'Código enviado via email',
  })
  @Public()
  @Post('generate-login-code')
  public async generateLoginCode(
    @Body() generateLoginCodeDto: GenerateLoginCodeDto,
  ) {
    return this.authService.generateLoginCode(generateLoginCodeDto);
  }

  @ApiOperation({ summary: 'Após gerado o código validar nesta API' })
  @ApiOkResponse({
    type: AuthenticateResponseDto,
    description: 'Usuário autenticado',
  })
  @Public()
  @Post('validate-login-code')
  public async validateLoginCode(
    @Body() validateLoginCodeDto: ValidateLoginCodeDto,
    @Headers() headers: any,
  ) {
    return this.authService.validateLoginCode({
      ...validateLoginCodeDto,
      deviceId: headers?.deviceId,
      os: headers?.deviceId,
      version: headers?.version,
    });
  }

  @ApiOperation({ summary: 'Testar validade do token' })
  @ApiBearerAuth()
  @Get('validate-token')
  async privateRoute() {
    return { authorized: true };
  }
}
