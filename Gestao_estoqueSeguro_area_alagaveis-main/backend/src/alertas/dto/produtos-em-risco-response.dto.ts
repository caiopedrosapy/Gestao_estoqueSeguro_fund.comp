import { ProdutoResponseDto } from '../../produtos/dto/produto-response.dto.js';

export class ProdutosEmRiscoResponseDto {
  alertaId!: number;
  estoqueId!: number;
  criterioAplicado!: string;
  produtos!: ProdutoResponseDto[];
}
