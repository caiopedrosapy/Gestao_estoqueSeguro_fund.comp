import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Produto } from '../produtos/entities/produto.entity.js';
import {
  Movimentacao,
  TipoMovimentacao,
} from './entities/movimentacao.entity.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { QueryMovimentacaoDto } from './dto/query-movimentacao.dto.js';
import { MovimentacaoResponseDto } from './dto/movimentacao-response.dto.js';

@Injectable()
export class MovimentacoesService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  async create(dto: CreateMovimentacaoDto) {
    return this.db.transaction(async (manager) => {
      const produtos = manager.getRepository(Produto);
      const p = await produtos.findOne({
        where: { id: dto.produtoId },
        lock: { mode: 'pessimistic_write' },
      });
      if (!p) throw new NotFoundException('Produto não encontrado.');
      const saldo =
        p.quantidade +
        (dto.tipo === TipoMovimentacao.ENTRADA
          ? dto.quantidade
          : -dto.quantidade);
      if (saldo < 0) {
        throw new ConflictException('Saldo insuficiente para a saída.');
      }
      if (saldo > 2147483647) {
        throw new ConflictException('Quantidade excede o limite permitido.');
      }
      p.quantidade = saldo;
      await produtos.save(p);
      const repo = manager.getRepository(Movimentacao);
      const m = await repo.save(repo.create(dto));
      return MovimentacaoResponseDto.from(m);
    });
  }

  async findAll(query: QueryMovimentacaoDto) {
    const rows = await this.db.getRepository(Movimentacao).find({
      where: {
        ...(query.produtoId !== undefined
          ? { produtoId: query.produtoId }
          : {}),
        ...(query.tipo !== undefined ? { tipo: query.tipo } : {}),
      },
      order: { id: 'DESC' },
    });
    return rows.map((m) => MovimentacaoResponseDto.from(m));
  }

  async findOne(id: number) {
    const m = await this.db.getRepository(Movimentacao).findOneBy({ id });
    if (!m) throw new NotFoundException('Movimentação não encontrada.');
    return MovimentacaoResponseDto.from(m);
  }
}