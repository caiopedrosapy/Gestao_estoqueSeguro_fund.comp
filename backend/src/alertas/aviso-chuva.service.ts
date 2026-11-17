
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ClimaService } from '../clima/clima.service.js';
import { NivelAlerta } from './entities/alerta.entity.js';

const PERIODOS = {
  1: 'umaHora',
  3: 'tresHoras',
  6: 'seisHoras',
  12: 'dozeHoras',
  24: 'vinteEQuatroHoras',
  48: 'quarentaEOitoHoras',
  72: 'setentaEDuasHoras',
} as const;

type PeriodoChuva = keyof typeof PERIODOS;

@Injectable()
export class AvisoChuvaService {
  constructor(
    private readonly climaService: ClimaService,
  ) {}

  verificar(chuvaMm: number | null) {
    if (
      chuvaMm === null ||
      !Number.isFinite(chuvaMm) ||
      chuvaMm < 0
    ) {
      return {
        nivel: null,
        mensagem: 'Medição indisponível.',
      };
    }

    if (chuvaMm >= 10) {
      return {
        nivel: NivelAlerta.ALTO,
        mensagem: 'Aviso alto de precipitação.',
      };
    }

    if (chuvaMm >= 5) {
      return {
        nivel: NivelAlerta.MEDIO,
        mensagem: 'Aviso moderado de precipitação.',
      };
    }

    if (chuvaMm >= 2) {
      return {
        nivel: NivelAlerta.BAIXO,
        mensagem: 'Atenção: limite inicial de chuva atingido.',
      };
    }

    return {
      nivel: null,
      mensagem: 'Sem aviso de chuva.',
    };
  }

  async consultarAvisos(
    municipio: string,
    periodo = 1,
  ) {
    if (!Object.prototype.hasOwnProperty.call(PERIODOS, periodo)) {
      throw new BadRequestException(
        'Período inválido. Use 1, 3, 6, 12, 24, 48 ou 72 horas.',
      );
    }

    const periodoValido = periodo as PeriodoChuva;
    const campo = PERIODOS[periodoValido];

    const dados = await this.climaService.consultarMunicipio(
      municipio,
    );

    const avisos = dados.estacoes.map((estacao) => {
      const chuvaMm = estacao.chuvaAcumulada[campo];
      const resultado = this.verificar(chuvaMm);

      return {
        estacao: estacao.estacao,
        municipio: estacao.municipio,
        chuvaMm,
        periodo: `${periodoValido} hora(s)`,
        nivel: resultado.nivel,
        mensagem: resultado.mensagem,
        ultimaLeitura: estacao.ultimaLeitura,
      };
    });

    return {
      fonte: dados.fonte,
      municipio: dados.municipio,
      periodoHoras: periodoValido,
      quantidadeEstacoes: dados.quantidadeEstacoes,
      avisos,
    };
  }
}
