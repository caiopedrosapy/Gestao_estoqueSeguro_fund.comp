import 'dotenv/config';
import type { DataSourceOptions } from 'typeorm';

import { Estoque } from '../estoques/entities/estoque.entity.js';
import { Produto } from '../produtos/entities/produto.entity.js';
import { Movimentacao } from '../movimentacoes/entities/movimentacao.entity.js';
import { Alerta } from '../alertas/entities/alerta.entity.js';

import { Inicial1791500000000 } from './migrations/1791500000000-inicial.js';

if (!process.env.DATABASE_URL) {
  throw new Error('Defina DATABASE_URL no arquivo backend/.env');
}

export const databaseOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Estoque, Produto, Movimentacao, Alerta],
  migrations: [Inicial1791500000000],
  synchronize: false,
  migrationsRun: false,
};