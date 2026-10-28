import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, MoreThan } from 'typeorm';
import { databaseError } from '../common/database-error.js';
import { Estoque } from '../estoques/entities/estoque.entity.js';
import { Produto } from '../produtos/entities/produto.entity.js';
import { ProdutoResponseDto } from '../produtos/dto/produto-response.dto.js';
import { Alerta, NivelAlerta } from './entities/alerta.entity.js';
import { CreateAlertaDto } from './dto/create-alerta.dto.js';
import { UpdateAlertaDto } from './dto/update-alerta.dto.js';
import { QueryAlertaDto } from './dto/query-alerta.dto.js';
import { AlertaResponseDto } from './dto/alerta-response.dto.js';
import { ProdutosEmRiscoResponseDto } from './dto/produtos-em-risco-response.dto.js';

@Injectable()
export class AlertasService {
  constructor(@InjectDataSource() private readonly db: DataSource) {}

  private async requireEstoque(id: number) {
    const exists = await this.db.getRepository(Estoque).existsBy({ id });
    if (!exists) throw new NotFoundException('Estoque não encontrado.');
  }

  async create(dto: CreateAlertaDto) {
    await this.requireEstoque(dto.estoqueId);
    const repo = this.db.getRepository(Alerta);
    try {
      const a = await repo.save(
        repo.create({
          estoqueId: dto.estoqueId,
          titulo: dto.titulo,
          nivel: dto.nivel,
          descricao: dto.descricao,
          ativo: dto.ativo ?? true,
        }),
      );
      return AlertaResponseDto.from(a);
    } catch (error) {
      databaseError(error);
    }
  }

  async findAll(query: QueryAlertaDto) {
    const rows = await this.db.getRepository(Alerta).find({
      where: {
        ...(query.estoqueId !== undefined ? { estoqueId: query.estoqueId } : {}),
        ...(query.ativo !== undefined ? { ativo: query.ativo === 'true' } : {}),
      },
      order: { id: 'DESC' },
    });
    return rows.map((a) => AlertaResponseDto.from(a));
  }

  async findOne(id: number) {
    const a = await this.db.getRepository(Alerta).findOneBy({ id });
    if (!a) throw new NotFoundException('Alerta não encontrado.');
    return AlertaResponseDto.from(a);
  }

  async update(id: number, dto: UpdateAlertaDto) {
    await this.findOne(id);
    if (dto.estoqueId !== undefined) await this.requireEstoque(dto.estoqueId);
    try {
      if (Object.keys(dto).length > 0) {
        await this.db.getRepository(Alerta).update(id, dto);
      }
      return await this.findOne(id);
    } catch (error) {
      databaseError(error);
    }
  }

  async remove(id: number) {
    const a = await this.findOne(id);
    await this.db.getRepository(Alerta).delete(id);
    return a;
  }

  async produtosEmRisco(id: number): Promise<ProdutosEmRiscoResponseDto> {
    const a = await this.findOne(id);
    const local = await this.db
      .getRepository(Estoque)
      .findOneBy({ id: a.estoqueId });
    if (!local) throw new NotFoundException('Estoque não encontrado.');

    const criterio = 'Alerta ALTO ativo, local vulnerável e saldo positivo.';
    const result: ProdutosEmRiscoResponseDto = {
      alertaId: a.id,
      estoqueId: a.estoqueId,
      criterioAplicado: criterio,
      produtos: [],
    };

    if (!a.ativo || a.nivel !== NivelAlerta.ALTO || local.seguro) {
      return result;
    }

    const rows = await this.db.getRepository(Produto).find({
      where: { estoqueId: a.estoqueId, quantidade: MoreThan(0) },
      order: { prioritario: 'DESC', id: 'ASC' },
    });

    result.produtos = rows.map((p) => ProdutoResponseDto.from(p));
    return result;
  }
}
