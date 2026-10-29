import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { IdPipe } from '../common/id.pipe.js';
import { ProdutosService } from './produtos.service.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { QueryProdutoDto  } from './dto/query-produto.dto.js';

@Controller('produtos')
export class ProdutosController {
  constructor(
    private readonly produtosService: ProdutosService,
  ) {}

  @Post()
  create(
    @Body() createProdutoDto: CreateProdutoDto,
  ) {
    return this.produtosService.create(
      createProdutoDto,
    );
  }

  @Get()
  findAll(@Query() query: QueryProdutoDto) {
    return this.produtosService.findAll(query);
  }

  @Get(':id')
  findOne(
    @Param('id', IdPipe) id: number,
  ) {
    return this.produtosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', IdPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtosService.update(
      id,
      updateProdutoDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', IdPipe) id: number,
  ) {
    return this.produtosService.remove(id);
  }
}