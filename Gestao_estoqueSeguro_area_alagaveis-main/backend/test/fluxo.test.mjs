import 'reflect-metadata';
import 'dotenv/config';
import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

test('fluxo integrado das quatro entidades', async (t) => {
  assert.ok(
    process.env.TEST_DATABASE_URL,
    'Defina TEST_DATABASE_URL para um banco exclusivo de testes.',
  );
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
  const { AppModule } = await import('../dist/app.module.js');
  const app = await NestFactory.create(AppModule, { logger: false });
  try {
    await app.get(DataSource).runMigrations();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.listen(0, '127.0.0.1');
    const base = await app.getUrl();
    const label = randomUUID().slice(0, 8);

    async function call(method, path, body, status = 200) {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body !== undefined) options.body = JSON.stringify(body);
      const response = await fetch(base + path, options);
      const data = await response.json();
      assert.equal(response.status, status, JSON.stringify(data));
      return data;
    }

    let local, outro, produto, movimento, alerta;
    await t.test('CRUD de locais e validação', async () => {
      local = await call(
        'POST',
        '/estoques',
        {
          nome: `Depósito ${label}`,
          localizacao: 'Térreo',
          alturaCm: 20,
          seguro: false,
        },
        201,
      );
      outro = await call(
        'POST',
        '/estoques',
        {
          nome: `Outro ${label}`,
          localizacao: 'Andar superior',
          alturaCm: 200,
          seguro: true,
        },
        201,
      );
      const editado = await call('PATCH', `/estoques/${local.id}`, {
        nome: `Depósito atualizado ${label}`,
      });
      assert.ok(editado.nome.startsWith('Depósito atualizado'));
      await call('PATCH', `/estoques/${local.id}`, { alturaCm: -1 }, 400);
      await call('PATCH', `/estoques/${local.id}`, { seguro: null }, 400);
      const vazio = await call(
        'POST',
        '/estoques',
        {
          nome: 'Local vazio',
          localizacao: 'Teste',
          alturaCm: 0,
        },
        201,
      );
      await call('DELETE', `/estoques/${vazio.id}`);
      await call('GET', `/estoques/${vazio.id}`, undefined, 404);
    });

    await t.test('produto vinculado e saldo inicial zero', async () => {
      produto = await call(
        'POST',
        '/produtos',
        {
          nome: `Arroz ${label}`,
          categoria: 'Alimentos',
          estoqueId: local.id,
          prioritario: true,
        },
        201,
      );
      assert.equal(produto.quantidade, 0);
      assert.equal(produto.estoqueId, local.id);
      const p = await call('PATCH', `/produtos/${produto.id}`, {
        nome: `Arroz atualizado ${label}`,
      });
      assert.ok(p.nome.startsWith('Arroz atualizado'));
      const descartavel = await call(
        'POST',
        '/produtos',
        {
          nome: 'Sem histórico',
          categoria: 'Teste',
          estoqueId: outro.id,
        },
        201,
      );
      await call('DELETE', `/produtos/${descartavel.id}`);
      await call('GET', `/produtos/${descartavel.id}`, undefined, 404);
    });

    await t.test(
      'rejeita campos indevidos e referências inválidas',
      async () => {
        await call(
          'PATCH',
          `/produtos/${produto.id}`,
          { quantidade: 99 },
          400,
        );
        await call('PATCH', `/produtos/${produto.id}`, { nome: null }, 400);
        await call(
          'POST',
          '/produtos',
          {
            nome: 'X',
            categoria: 'X',
            estoqueId: 2147483647,
          },
          404,
        );
        for (const id of ['abc', '-1', '2147483648']) {
          await call('GET', `/produtos/${id}`, undefined, 400);
        }
        await call(
          'POST',
          '/movimentacoes',
          {
            produtoId: produto.id,
            tipo: 'SAIDA',
            quantidade: 0,
          },
          400,
        );
        await call(
          'POST',
          '/movimentacoes',
          {
            produtoId: 2147483647,
            tipo: 'ENTRADA',
            quantidade: 1,
          },
          404,
        );
      },
    );

    await t.test('entrada e saída atualizam o saldo', async () => {
      movimento = await call(
        'POST',
        '/movimentacoes',
        {
          produtoId: produto.id,
          tipo: 'ENTRADA',
          quantidade: 10,
        },
        201,
      );
      await call(
        'POST',
        '/movimentacoes',
        {
          produtoId: produto.id,
          tipo: 'SAIDA',
          quantidade: 3,
        },
        201,
      );
      const p = await call('GET', `/produtos/${produto.id}`);
      assert.equal(p.quantidade, 7);
      assert.ok(movimento.criadaEm);
    });

    await t.test('falha por saldo insuficiente não grava saída', async () => {
      await call(
        'POST',
        '/movimentacoes',
        {
          produtoId: produto.id,
          tipo: 'SAIDA',
          quantidade: 8,
        },
        409,
      );
      const p = await call('GET', `/produtos/${produto.id}`);
      assert.equal(p.quantidade, 7);
      const rows = await call(
        'GET',
        `/movimentacoes?produtoId=${produto.id}`,
      );
      assert.equal(rows.length, 2);
    });

    await t.test('duas saídas simultâneas respeitam o saldo', async () => {
      const send = () =>
        fetch(base + '/movimentacoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            produtoId: produto.id,
            tipo: 'SAIDA',
            quantidade: 5,
          }),
        });
      const results = await Promise.all([send(), send()]);
      assert.deepEqual(
        results.map((r) => r.status).sort((a, b) => a - b),
        [201, 409],
      );
      const p = await call('GET', `/produtos/${produto.id}`);
      assert.equal(p.quantidade, 2);
    });

    await t.test('preserva local e histórico após movimentação', async () => {
      await call(
        'PATCH',
        `/produtos/${produto.id}`,
        {
          estoqueId: outro.id,
        },
        409,
      );
      await call('DELETE', `/produtos/${produto.id}`, undefined, 409);
      await call('DELETE', `/estoques/${local.id}`, undefined, 409);
      await call('PATCH', `/movimentacoes/${movimento.id}`, {}, 404);
      await call('DELETE', `/movimentacoes/${movimento.id}`, undefined, 404);
      await call(
        'POST',
        '/movimentacoes',
        {
          produtoId: produto.id,
          tipo: 'SAIDA',
          quantidade: 2,
        },
        201,
      );
      await call('DELETE', `/produtos/${produto.id}`, undefined, 409);
    });

    await t.test('filtros recebem valores válidos', async () => {
      const rows = await call(
        'GET',
        `/produtos?estoqueId=${local.id}&prioritario=true`,
      );
      assert.ok(rows.some((p) => p.id === produto.id));
      assert.ok(rows.every((p) => p.estoqueId === local.id && p.prioritario));
      await call('GET', '/produtos?prioritario=talvez', undefined, 400);
      await call('GET', '/movimentacoes?produtoId=abc', undefined, 400);
    });

    await t.test(
      'alerta inclui somente produtos afetados e ordena prioridade',
      async () => {
        await call(
          'POST',
          '/movimentacoes',
          {
            produtoId: produto.id,
            tipo: 'ENTRADA',
            quantidade: 4,
          },
          201,
        );
        const comum = await call(
          'POST',
          '/produtos',
          {
            nome: 'Comum',
            categoria: 'Teste',
            estoqueId: local.id,
          },
          201,
        );
        await call(
          'POST',
          '/movimentacoes',
          {
            produtoId: comum.id,
            tipo: 'ENTRADA',
            quantidade: 1,
          },
          201,
        );
        const zerado = await call(
          'POST',
          '/produtos',
          {
            nome: 'Zerado',
            categoria: 'Teste',
            estoqueId: local.id,
          },
          201,
        );
        const distante = await call(
          'POST',
          '/produtos',
          {
            nome: 'Outro local',
            categoria: 'Teste',
            estoqueId: outro.id,
          },
          201,
        );
        await call(
          'POST',
          '/movimentacoes',
          {
            produtoId: distante.id,
            tipo: 'ENTRADA',
            quantidade: 1,
          },
          201,
        );
        alerta = await call(
          'POST',
          '/alertas',
          {
            estoqueId: local.id,
            titulo: 'Risco informado',
            nivel: 'ALTO',
            descricao: 'Cenário de demonstração informado manualmente.',
          },
          201,
        );
        assert.equal(alerta.origem, 'MANUAL');
        const result = await call(
          'GET',
          `/alertas/${alerta.id}/produtos-em-risco`,
        );
        assert.deepEqual(
          result.produtos.map((p) => p.id),
          [produto.id, comum.id],
        );
        assert.ok(!result.produtos.some((p) => p.id === zerado.id));
        assert.ok(!result.produtos.some((p) => p.id === distante.id));
      },
    );

    await t.test(
      'alerta inativo moderado ou local seguro não seleciona itens',
      async () => {
        const path = `/alertas/${alerta.id}/produtos-em-risco`;
        await call('PATCH', `/alertas/${alerta.id}`, { ativo: false });
        assert.deepEqual((await call('GET', path)).produtos, []);
        await call('PATCH', `/alertas/${alerta.id}`, {
          ativo: true,
          nivel: 'MEDIO',
        });
        assert.deepEqual((await call('GET', path)).produtos, []);
        await call('PATCH', `/alertas/${alerta.id}`, { nivel: 'ALTO' });
        await call('PATCH', `/estoques/${local.id}`, { seguro: true });
        assert.deepEqual((await call('GET', path)).produtos, []);
        await call('DELETE', `/alertas/${alerta.id}`);
        await call('GET', `/alertas/${alerta.id}`, undefined, 404);
      },
    );
  } finally {
    await app.close();
  }
});