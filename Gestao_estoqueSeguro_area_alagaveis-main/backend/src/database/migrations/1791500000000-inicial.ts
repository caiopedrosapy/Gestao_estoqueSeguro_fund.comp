import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Inicial1791500000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE estoques (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(120) NOT NULL CHECK (btrim(nome) <> ''),
        localizacao VARCHAR(200) NOT NULL
          CHECK (btrim(localizacao) <> ''),
        altura_cm INTEGER NOT NULL CHECK (altura_cm >= 0),
        seguro BOOLEAN NOT NULL DEFAULT false
      );

      CREATE TABLE produtos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(120) NOT NULL CHECK (btrim(nome) <> ''),
        categoria VARCHAR(80) NOT NULL CHECK (btrim(categoria) <> ''),
        quantidade INTEGER NOT NULL DEFAULT 0
          CHECK (quantidade >= 0),
        prioritario BOOLEAN NOT NULL DEFAULT false,
        estoque_id INTEGER NOT NULL REFERENCES estoques(id)
          ON DELETE RESTRICT
      );

      CREATE INDEX idx_produtos_estoque ON produtos(estoque_id);

      CREATE TABLE movimentacoes (
        id SERIAL PRIMARY KEY,
        produto_id INTEGER NOT NULL REFERENCES produtos(id)
          ON DELETE RESTRICT,
        tipo VARCHAR(7) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
        quantidade INTEGER NOT NULL CHECK (quantidade > 0),
        criada_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE INDEX idx_movimentacoes_produto
        ON movimentacoes(produto_id);

      CREATE TABLE alertas (
        id SERIAL PRIMARY KEY,
        estoque_id INTEGER NOT NULL REFERENCES estoques(id)
          ON DELETE RESTRICT,
        titulo VARCHAR(160) NOT NULL CHECK (btrim(titulo) <> ''),
        nivel VARCHAR(5) NOT NULL
          CHECK (nivel IN ('BAIXO', 'MEDIO', 'ALTO')),
        descricao VARCHAR(2000) NOT NULL
          CHECK (btrim(descricao) <> ''),
        ativo BOOLEAN NOT NULL DEFAULT true,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE INDEX idx_alertas_estoque ON alertas(estoque_id);
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE alertas;
      DROP TABLE movimentacoes;
      DROP TABLE produtos;
      DROP TABLE estoques;
    `);
  }
}