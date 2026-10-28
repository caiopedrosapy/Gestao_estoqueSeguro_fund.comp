import type { Alerta } from '../entities/alerta.entity.js';
import { NivelAlerta } from '../entities/alerta.entity.js';

export class AlertaResponseDto {
  id!: number;
  estoqueId!: number;
  titulo!: string;
  nivel!: NivelAlerta;
  descricao!: string;
  ativo!: boolean;
  criadoEm!: string;
  origem!: 'MANUAL';

  static from(a: Alerta): AlertaResponseDto {
    return {
      id: a.id,
      estoqueId: a.estoqueId,
      titulo: a.titulo,
      nivel: a.nivel,
      descricao: a.descricao,
      ativo: a.ativo,
      criadoEm: a.criadoEm.toISOString(),
      origem: 'MANUAL',
    };
  }
}
