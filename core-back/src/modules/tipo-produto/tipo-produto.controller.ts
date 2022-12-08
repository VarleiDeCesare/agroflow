import { TipoProduto } from './entities/tipo-produto.entity';
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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tipo de produtos')
@Controller('tipo-produtos')
@UseGuards(AuthGuard('jwt'))
export class TipoProdutoController {
  constructor(private readonly tipoProdutoService: TipoProdutoService) {}

  @ApiOperation({ summary: 'Criação de um tipo de produto' })
  @ApiCreatedResponse({
    type: TipoProduto,
    description: 'Tipo de produto criado com sucesso',
  })
  @Post()
  create(@Body() data: CreateTipoProdutoDto) {
    return this.tipoProdutoService.create(data);
  }

  @ApiOperation({ summary: 'Listagem de tipos de produtos' })
  @Get()
  findAll() {
    return this.tipoProdutoService.findAll();
  }

  @ApiOperation({ summary: 'Busca de tipo de produto por id' })
  @ApiOkResponse({
    type: TipoProduto,
    description: 'Busca de tipo de produto por id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do tipo de produto',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoProdutoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização de tipo de produtos' })
  @ApiOkResponse({
    type: TipoProduto,
    description: 'Edição de tipo de produto pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do tipo de produto',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTipoProdutoDto) {
    return this.tipoProdutoService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção de tipo de produto' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do tipo de produto',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoProdutoService.remove(id);
  }
}
