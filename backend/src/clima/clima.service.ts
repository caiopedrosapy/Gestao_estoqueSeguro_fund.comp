
import {
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';

interface ApacFeature {
  attributes: {
    nome: string;
    municipio: string;
    latitude: number;
    longitude: number;
    bacia: string;
    ultima_leitura: string;
    ultima_leitura_hora: string;
    ultima_leitura_data_hora: string;
    hora_1: number;
    horas_3: number;
    horas_6: number;
    horas_12: number;
    horas_24: number;
    horas_48: number;
    horas_72: number;
    fabricante: string;
  };
}

interface ApacResponse {
  features?: ApacFeature[];
  error?: {
    message: string;
  };
}

@Injectable()
export class ClimaService {
  private readonly apiUrl =
    'https://geoportal.apac.pe.gov.br/server/rest/services/met_volume_acumulado_chuva_24hs/MapServer/0/query';

  async consultarMunicipio(municipio: string) {
    const nomeMunicipio = municipio.trim();

    if (!nomeMunicipio) {
      throw new ServiceUnavailableException(
        'Informe um município válido.',
      );
    }

    const parametros = new URLSearchParams({
      where: `municipio='${nomeMunicipio.replace(/'/g, "''")}'`,
      outFields: '*',
      returnGeometry: 'false',
      f: 'json',
    });

    try {
      const resposta = await fetch(
        `${this.apiUrl}?${parametros.toString()}`,
        {
          signal: AbortSignal.timeout(15000),
        },
      );

      if (!resposta.ok) {
        throw new Error('Falha na comunicação com a APAC.');
      }

      const dados = (await resposta.json()) as ApacResponse;

      if (dados.error) {
        throw new Error(dados.error.message);
      }

      const estacoes = (dados.features ?? []).map((feature) => {
        const leitura = feature.attributes;

        return {
          estacao: leitura.nome,
          municipio: leitura.municipio,
          bacia: leitura.bacia,
          fabricante: leitura.fabricante,

          localizacao: {
            latitude: leitura.latitude,
            longitude: leitura.longitude,
          },

          ultimaLeitura: {
            data: leitura.ultima_leitura,
            horario: leitura.ultima_leitura_hora,
            dataHora: leitura.ultima_leitura_data_hora,
          },

          chuvaAcumulada: {
            umaHora: this.tratarMedicao(leitura.hora_1),
            tresHoras: this.tratarMedicao(leitura.horas_3),
            seisHoras: this.tratarMedicao(leitura.horas_6),
            dozeHoras: this.tratarMedicao(leitura.horas_12),
            vinteEQuatroHoras: this.tratarMedicao(leitura.horas_24),
            quarentaEOitoHoras: this.tratarMedicao(leitura.horas_48),
            setentaEDuasHoras: this.tratarMedicao(leitura.horas_72),
          },
        };
      });

      return {
        fonte: 'APAC - Agência Pernambucana de Águas e Clima',
        municipio: nomeMunicipio,
        quantidadeEstacoes: estacoes.length,
        estacoes,
      };
    } catch {
      throw new ServiceUnavailableException(
        'Não foi possível consultar os dados climáticos da APAC no momento.',
      );
    }
  }

  private tratarMedicao(valor: number | null): number | null {
    if (valor === null || valor === undefined || valor === -1) {
      return null;
    }

    return valor;
  }
}