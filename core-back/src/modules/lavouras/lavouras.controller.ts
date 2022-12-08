import { Lavoura } from './entities/lavoura.entity';
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
} from '@nestjs/common';
import { LavourasService } from './lavouras.service';
import { CreateLavouraDto } from './dto/create-lavoura.dto';
import { UpdateLavouraDto } from './dto/update-lavoura.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Lavouras')
@UseGuards(AuthGuard('jwt'))
@Controller('lavouras')
export class LavourasController {
  constructor(private readonly lavouraService: LavourasService) {}

  @ApiOperation({ summary: 'Criação de uma lavoura' })
  @ApiCreatedResponse({
    type: Lavoura,
    description: 'Lavoura criada com sucesso',
  })
  @Post()
  create(@Body() data: CreateLavouraDto, @CurrentUser() user: JwtPayloadDto) {
    return this.lavouraService.create(user, data);
  }

  @ApiOperation({ summary: 'Listagem de lavouras' })
  @Get()
  findAll(@CurrentUser() user: JwtPayloadDto) {
    return this.lavouraService.findAll(user.id);
  }

  @ApiOperation({ summary: 'Busca de lavoura por id' })
  @ApiOkResponse({
    type: Lavoura,
    description: 'Busca de tipo de produto por id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do usuário',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lavouraService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização de lavoura' })
  @ApiOkResponse({
    type: Lavoura,
    description: 'Edição de lavoura pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do usuário',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateLavouraDto) {
    return this.lavouraService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção de lavoura' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da lavoura',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lavouraService.remove(id);
  }
}
