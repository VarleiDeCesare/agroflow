import { Produto } from './entities/produto.entity';
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
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('produtos')
@UseGuards(AuthGuard('jwt'))
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @ApiOperation({ summary: 'Criação de Produto' })
  @ApiCreatedResponse({
    type: Produto,
    description: 'Produto criado com sucesso',
  })
  @Post()
  create(@Body() data: CreateProdutoDto) {
    return this.produtoService.create(data);
  }

  @ApiOperation({ summary: 'Listagem de produtos' })
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @ApiOperation({ summary: 'Busca de produto por id' })
  @ApiOkResponse({
    type: Produto,
    description: 'Busca de produto por id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do produto',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização do produto' })
  @ApiOkResponse({
    type: Produto,
    description: 'Edição do produto pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do produto',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProdutoDto) {
    return this.produtoService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção do produto pelo id' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id do produto',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(id);
  }
}
