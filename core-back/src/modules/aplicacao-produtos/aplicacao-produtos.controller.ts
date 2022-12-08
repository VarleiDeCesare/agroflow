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
} from '@nestjs/common';
import { AplicacaoProdutosService } from './aplicacao-produtos.service';
import { CreateAplicacaoProdutoDto } from './dto/create-aplicacao-produto.dto';
import { UpdateAplicacaoProdutoDto } from './dto/update-aplicacao-produto.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('aplicacao-produtos')
@UseGuards(AuthGuard('jwt'))
export class AplicacaoProdutosController {
  constructor(
    private readonly aplicacaoProdutosService: AplicacaoProdutosService,
  ) {}

  @Post()
  create(
    @Body() data: CreateAplicacaoProdutoDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    data.user_id = user.id;
    return this.aplicacaoProdutosService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadDto) {
    return this.aplicacaoProdutosService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aplicacaoProdutosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAplicacaoProdutoDto) {
    return this.aplicacaoProdutosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicacaoProdutosService.remove(id);
  }
}
