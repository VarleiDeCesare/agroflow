import { Cultura } from './entities/cultura.entity';
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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CulturaService } from './cultura.service';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';

@ApiTags('Culturas')
@Controller('culturas')
@UseGuards(AuthGuard('jwt'))
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @ApiOperation({ summary: 'Criação de Cultura' })
  @ApiCreatedResponse({
    type: Cultura,
    description: 'Cultura criada com sucesso',
  })
  @Post()
  create(@Body() data: CreateCulturaDto) {
    return this.culturaService.create(data);
  }

  @ApiOperation({ summary: 'Listagem de culturas' })
  @Get()
  findAll() {
    return this.culturaService.findAll();
  }

  @ApiOperation({ summary: 'Busca de cultura por id' })
  @ApiOkResponse({
    type: Cultura,
    description: 'Busca de cultura por id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da cultura',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culturaService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualização da cultura' })
  @ApiOkResponse({
    type: Cultura,
    description: 'Edição da cultura pelo id',
  })
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da cultura',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCulturaDto) {
    return this.culturaService.update(id, data);
  }

  @ApiOperation({ summary: 'Deleção de cultura pelo id' })
  @ApiNoContentResponse()
  @ApiParam({
    name: 'id',
    type: 'uuid',
    description: 'id da cultura',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culturaService.remove(id);
  }
}
