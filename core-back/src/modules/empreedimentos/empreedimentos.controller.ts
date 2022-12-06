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

@UseGuards(AuthGuard('jwt'))
@Controller('empreedimentos')
export class EmpreedimentosController {
  constructor(private readonly empreedimentosService: EmpreedimentosService) {}

  @Post()
  create(
    @Body() data: CreateEmpreedimentoDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.empreedimentosService.create(user, data);
  }

  @Get()
  findAll(
    @CurrentUser() user: JwtPayloadDto,
    @Query() query?: FindAllEmpreedimentoDto,
  ) {
    return this.empreedimentosService.findAll(user, query);
  }

  @Get('one')
  findOne(@Query() query: FindOneEmpreedimentoDto) {
    return this.empreedimentosService.findById(query.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateEmpreedimentoDto) {
    return this.empreedimentosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empreedimentosService.remove(id);
  }
}
