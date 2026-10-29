import type { Movimentacao } from '../entities/movimentacao.entity.js';
import { TipoMovimentacao } from '../entities/movimentacao.entity.js';

export class MovimentacaoResponseDto {
  id!: number;
  produtoId!: number;
  tipo!: TipoMovimentacao;
  quantidade!: number;
  criadaEm!: string;

  static from(m: Movimentacao): MovimentacaoResponseDto {
    return {
      id: m.id,
      produtoId: m.produtoId,
      tipo: m.tipo,
      quantidade: m.quantidade,
      criadaEm: m.criadaEm.toISOString(),
    };
  }
}