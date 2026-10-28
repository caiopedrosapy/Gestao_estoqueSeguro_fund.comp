import type { Estoque } from '../entities/estoque.entity.js';

export class EstoqueResponseDto {
  id!: number;
  nome!: string;
  localizacao!: string;
  alturaCm!: number;
  seguro!: boolean;

  static from(e: Estoque): EstoqueResponseDto {
    return {
      id: e.id,
      nome: e.nome,
      localizacao: e.localizacao,
      alturaCm: e.alturaCm,
      seguro: e.seguro,
    };
  }
}