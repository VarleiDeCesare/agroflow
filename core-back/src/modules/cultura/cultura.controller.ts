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
import { CulturaService } from './cultura.service';
import { CreateCulturaDto } from './dto/create-cultura.dto';
import { UpdateCulturaDto } from './dto/update-cultura.dto';

@Controller('culturas')
@UseGuards(AuthGuard('jwt'))
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @Post()
  create(@Body() data: CreateCulturaDto) {
    return this.culturaService.create(data);
  }

  @Get()
  findAll() {
    return this.culturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culturaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCulturaDto) {
    return this.culturaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culturaService.remove(id);
  }
}
