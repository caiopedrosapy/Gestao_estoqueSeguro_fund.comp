import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { TipoMovimentacao } from '../entities/movimentacao.entity.js';

export class CreateMovimentacaoDto {
  @IsInt()
  @Min(1)
  @Max(2147483647)
  produtoId!: number;

  @IsEnum(TipoMovimentacao)
  tipo!: TipoMovimentacao;

  @IsInt()
  @Min(1)
  @Max(2147483647)
  quantidade!: number;
}