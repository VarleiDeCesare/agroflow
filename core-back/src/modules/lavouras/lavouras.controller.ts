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

@UseGuards(AuthGuard('jwt'))
@Controller('lavouras')
export class LavourasController {
  constructor(private readonly lavouraService: LavourasService) {}

  @Post()
  create(@Body() data: CreateLavouraDto, @CurrentUser() user: JwtPayloadDto) {
    data.user_id = user.id;
    console.log(data);

    return this.lavouraService.create(data);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayloadDto) {
    return this.lavouraService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lavouraService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateLavouraDto) {
    return this.lavouraService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lavouraService.remove(id);
  }
}
