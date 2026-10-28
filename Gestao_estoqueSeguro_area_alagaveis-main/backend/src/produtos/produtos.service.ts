import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { databaseError } from '../common/database-error.js';
import { Estoque } from '../estoques/entities/estoque.entity.js';
import { CreateProdutoDto } from './dto/create-produto.dto.js';
import { ProdutoResponseDto } from './dto/produto-response.dto.js';
import { QueryProdutoDto } from './dto/query-produto.dto.js';
import { UpdateProdutoDto } from './dto/update-produto.dto.js';
import { Produto } from './entities/produto.entity.js';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectDataSource()
    private readonly db: DataSource,
  ) {}

  async create(dto: CreateProdutoDto) {
    const local = await this.db
      .getRepository(Estoque)
      .existsBy({ id: dto.estoqueId });

    if (!local) {
      throw new NotFoundException('Estoque não encontrado.');
    }

    const repo = this.db.getRepository(Produto);

    try {
      const produto = await repo.save(
        repo.create({
          nome: dto.nome,
          categoria: dto.categoria,
          estoqueId: dto.estoqueId,
          quantidade: 0,
          prioritario: dto.prioritario ?? false,
        }),
      );

      return ProdutoResponseDto.from(produto);
    } catch (error) {
      databaseError(error);
    }
  }

  async findAll(query: QueryProdutoDto) {
    const produtos = await this.db.getRepository(Produto).find({
      where: {
        ...(query.estoqueId !== undefined
          ? { estoqueId: query.estoqueId }
          : {}),
        ...(query.prioritario !== undefined
          ? { prioritario: query.prioritario === 'true' }
          : {}),
      },
      order: { id: 'ASC' },
    });

    return produtos.map((produto) =>
      ProdutoResponseDto.from(produto),
    );
  }

  async findOne(id: number) {
    const produto = await this.db
      .getRepository(Produto)
      .findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return ProdutoResponseDto.from(produto);
  }

  async update(id: number, dto: UpdateProdutoDto) {
    try {
      return await this.db.transaction(async (manager) => {
        const repo = manager.getRepository(Produto);

        const produto = await repo.findOne({
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!produto) {
          throw new NotFoundException('Produto não encontrado.');
        }

        if (
          dto.estoqueId !== undefined &&
          dto.estoqueId !== produto.estoqueId
        ) {
          const movimentacoes = await manager.query<{ id: number }[]>(
            'SELECT id FROM movimentacoes WHERE produto_id = $1 LIMIT 1',
            [id],
          );

          if (movimentacoes.length > 0) {
            throw new ConflictException(
              'Produto com movimentação não pode trocar de local.',
            );
          }

          const estoqueExiste = await manager
            .getRepository(Estoque)
            .existsBy({ id: dto.estoqueId });

          if (!estoqueExiste) {
            throw new NotFoundException('Estoque não encontrado.');
          }
        }

        Object.assign(produto, dto);

        const atualizado = await repo.save(produto);

        return ProdutoResponseDto.from(atualizado);
      });
    } catch (error) {
      databaseError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.transaction(async (manager) => {
        const repo = manager.getRepository(Produto);

        const produto = await repo.findOne({
          where: { id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!produto) {
          throw new NotFoundException('Produto não encontrado.');
        }

        if (produto.quantidade !== 0) {
          throw new ConflictException(
            'Produto ainda possui saldo.',
          );
        }

        await repo.delete(id);

        return ProdutoResponseDto.from(produto);
      });
    } catch (error) {
      databaseError(error);
    }
  }
}