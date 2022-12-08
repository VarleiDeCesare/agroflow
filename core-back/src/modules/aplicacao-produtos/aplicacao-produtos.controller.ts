import { AplicacaoProduto } from './entities/aplicacao-produto.entity';
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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Aplicação de produtos')
@Controller('aplicacao-produtos')
@UseGuards(AuthGuard('jwt'))
export class AplicacaoProdutosController {
  constructor(
    private readonly aplicacaoProdutosService: AplicacaoProdutosService,
  ) {}

  @ApiOperation({ summary: 'Criação de uma aplicação de produto' })
  @ApiCreatedResponse({
    type: AplicacaoProduto,
    description: 'Aplicação de produto criada com sucesso',
  })
  @Post()
  create(
    @Body() data: CreateAplicacaoProdutoDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    data.user_id = user.id;
    return this.aplicacaoProdutosService.create(data);
  }

  @ApiOperation({ summary: 'Listagem de aplicações de produtos' })
  @Get()
  findAll(@CurrentUser() user: JwtPayloadDto) {
    return this.aplicacaoProdutosService.findAll(user);
  }

  @ApiOperation({ summary: 'Busca de aplicação de produto por id' })
  @ApiOkResponse({
    type: AplicacaoProduto,
    description: 'Busca de aplicação de produto por id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da aplicação de produto',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aplicacaoProdutosService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização da aplicação de produto por id' })
  @ApiOkResponse({
    type: AplicacaoProduto,
    description: 'Edição da aplicação de produto pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da aplicação de produto',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAplicacaoProdutoDto) {
    return this.aplicacaoProdutosService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção da aplicação de produto pelo id' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da aplicação produto',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aplicacaoProdutosService.remove(id);
  }
}
