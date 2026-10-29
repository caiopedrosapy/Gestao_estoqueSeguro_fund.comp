import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { IdPipe } from '../common/id.pipe.js';
import { EstoquesService } from './estoques.service.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';

@Controller('estoques')
export class EstoquesController {
  constructor(private readonly service: EstoquesService) {}

  @Post()
  create(@Body() dto: CreateEstoqueDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', IdPipe) id: number, @Body() dto: UpdateEstoqueDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', IdPipe) id: number) {
    return this.service.remove(id);
  }
}