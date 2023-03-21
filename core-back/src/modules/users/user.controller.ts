import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import { User } from './entities/user.entity';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listagem de usuários' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Criação de usuário' })
  @ApiCreatedResponse({
    type: User,
    description: 'Usuário criado com sucesso',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualização de dados do usuário' })
  @ApiOkResponse({
    type: User,
    description: 'Edição de usuários pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do usuário',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Deleção do usuário' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do usuário',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Pega os dados do usuário' })
  @ApiOkResponse({
    description: 'Dados do usuário',
  })
  @Get('/me')
  public async getUserData(@CurrentUser() currentUser: JwtPayloadDto) {
    return this.userService.getAuthenticatedUserData(currentUser.id);
  }
}
