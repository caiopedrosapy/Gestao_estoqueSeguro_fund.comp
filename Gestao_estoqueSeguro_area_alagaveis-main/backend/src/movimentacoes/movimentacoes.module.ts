import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity.js';
import { MovimentacoesController } from './movimentacoes.controller.js';
import { MovimentacoesService } from './movimentacoes.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao])],
  controllers: [MovimentacoesController],
  providers: [MovimentacoesService],
})
export class MovimentacoesModule {}