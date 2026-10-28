import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estoque } from './entities/estoque.entity.js';
import { EstoquesController } from './estoques.controller.js';
import { EstoquesService } from './estoques.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Estoque])],
  controllers: [EstoquesController],
  providers: [EstoquesService],
})
export class EstoquesModule {}