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
import { TipoProdutoService } from './tipo-produto.service';
import { CreateTipoProdutoDto } from './dto/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from './dto/update-tipo-produto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tipo-produtos')
@UseGuards(AuthGuard('jwt'))
export class TipoProdutoController {
  constructor(private readonly tipoProdutoService: TipoProdutoService) {}

  @Post()
  create(@Body() data: CreateTipoProdutoDto) {
    return this.tipoProdutoService.create(data);
  }

  @Get()
  findAll() {
    return this.tipoProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProdutoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTipoProdutoDto) {
    return this.tipoProdutoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProdutoService.remove(id);
  }
}
