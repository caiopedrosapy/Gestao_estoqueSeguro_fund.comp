import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { IdPipe } from '../common/id.pipe.js';
import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { QueryMovimentacaoDto } from './dto/query-movimentacao.dto.js';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly service: MovimentacoesService) {}

  @Post()
  create(@Body() dto: CreateMovimentacaoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryMovimentacaoDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', IdPipe) id: number) {
    return this.service.findOne(id);
  }
}