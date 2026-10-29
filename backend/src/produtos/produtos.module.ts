import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProdutosController } from './produtos.controller.js';
import { ProdutosService } from './produtos.service.js';
import { Produto } from './entities/produto.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutosModule {}