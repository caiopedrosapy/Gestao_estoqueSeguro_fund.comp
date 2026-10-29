
import type { Produto } from '../entities/produto.entity.js';

export class ProdutoResponseDto {
  id!: number;
  nome!: string;
  categoria!: string;
  estoqueId!: number;
  quantidade!: number;
  prioritario!: boolean;

  static from(p: Produto): ProdutoResponseDto {
    return {
      id: p.id,
      nome: p.nome,
      categoria: p.categoria,
      estoqueId: p.estoqueId,
      quantidade: p.quantidade,
      prioritario: p.prioritario,
    };
  }
}