import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { databaseError } from '../common/database-error.js';
import { Estoque } from './entities/estoque.entity.js';
import { CreateEstoqueDto } from './dto/create-estoque.dto.js';
import { UpdateEstoqueDto } from './dto/update-estoque.dto.js';
import { EstoqueResponseDto } from './dto/estoque-response.dto.js';

@Injectable()
export class EstoquesService {
  constructor(
    @InjectRepository(Estoque)
    private readonly repo: Repository<Estoque>,
  ) {}

  async create(dto: CreateEstoqueDto) {
    const estoque = await this.repo.save(
      this.repo.create({
        nome: dto.nome,
        localizacao: dto.localizacao,
        alturaCm: dto.alturaCm,
        seguro: dto.seguro ?? false,
      }),
    );
    return EstoqueResponseDto.from(estoque);
  }

  async findAll() {
    const rows = await this.repo.find({ order: { id: 'ASC' } });
    return rows.map((e) => EstoqueResponseDto.from(e));
  }

  async findOne(id: number) {
    const estoque = await this.repo.findOneBy({ id });
    if (!estoque) throw new NotFoundException('Estoque não encontrado.');
    return EstoqueResponseDto.from(estoque);
  }

  async update(id: number, dto: UpdateEstoqueDto) {
    await this.findOne(id);
    if (Object.keys(dto).length > 0) {
      await this.repo.update(id, dto);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const estoque = await this.findOne(id);
    try {
      await this.repo.delete(id);
    } catch (error) {
      databaseError(error);
    }
    return estoque;
  }
}