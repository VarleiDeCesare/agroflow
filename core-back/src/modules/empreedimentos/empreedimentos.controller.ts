import { Empreedimento } from './entities/empreedimento.entity';
import { JwtPayloadDto } from './../auth/dto/jwt-payload.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EmpreedimentosService } from './empreedimentos.service';
import { CreateEmpreedimentoDto } from './dto/create-empreedimento.dto';
import { UpdateEmpreedimentoDto } from './dto/update-empreedimento.dto';
import { FindOneEmpreedimentoDto } from './dto/find-one-empreedimento.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { FindAllEmpreedimentoDto } from './dto/find-all-empreedimento.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Empreedimentos')
@UseGuards(AuthGuard('jwt'))
@Controller('empreedimentos')
export class EmpreedimentosController {
  constructor(private readonly empreedimentosService: EmpreedimentosService) {}

  @ApiOperation({ summary: 'Criação de Empreedimento' })
  @ApiCreatedResponse({
    type: Empreedimento,
    description: 'Empreendimento criado com sucesso',
  })
  @Post()
  create(
    @Body() data: CreateEmpreedimentoDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.empreedimentosService.create(user, data);
  }

  @ApiOperation({ summary: 'Listagem de empreendimentos' })
  @Get()
  findAll(
    @CurrentUser() user: JwtPayloadDto,
    @Query() query?: FindAllEmpreedimentoDto,
  ) {
    return this.empreedimentosService.findAll(user, query);
  }

  @ApiOperation({ summary: 'Busca de empreendimento por id' })
  @ApiOkResponse({
    type: Empreedimento,
    description: 'Busca de empreendimento por id',
  })
  @Get('one')
  findOne(@Query() query: FindOneEmpreedimentoDto) {
    return this.empreedimentosService.findById(query.id);
  }

  @ApiOperation({ summary: 'Atualização de empreendimento' })
  @ApiOkResponse({
    type: Empreedimento,
    description: 'Edição do empreendimento pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do empreendimento',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateEmpreedimentoDto) {
    return this.empreedimentosService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção do empreendimento pelo id' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do empreendimento',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empreedimentosService.remove(id);
  }
}
