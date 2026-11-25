# Testes do Estoque Seguro

## Integração pelo navegador

Em 25/11/2026, o protótipo foi validado em Docker no Windows com o código
integrado no [PR #3](https://github.com/caiopedrosapy/Gestao_estoqueSeguro_fund.comp/pull/3).
A interface em `http://localhost:18080` conectou à API de estoque. A equipe
cadastrou um local e um produto, registrou uma entrada e confirmou que o
saldo e a movimentação continuaram visíveis após recarregar a página.

Para repetir a validação, siga as [instruções do README](../README.md#executar-com-docker).

## Concorrência na API

Na demonstração de 12/11/2026, duas solicitações simultâneas tentaram retirar
7 unidades de um produto com saldo de 10. A API aceitou uma saída (`HTTP 201`),
recusou a outra por saldo insuficiente (`HTTP 409`) e manteve o saldo final em
3 unidades. A ordem das respostas pode variar.

Em 25/11/2026, o mesmo script foi executado diretamente contra a API da
`main` conectada ao PostgreSQL 16. Repetiu o resultado de uma resposta
`201`, uma `409` e saldo final de 3 unidades.

Para repetir pelo Nginx, suba o Compose e execute, na raiz do repositório:

```sh
docker compose exec -T -e API_URL=http://frontend/api api node demonstracao-concorrencia.mjs
```

O script cria um local e um produto fictícios no banco do Compose. Use-o em
ambiente de teste.

## Suíte automatizada do backend

Em 25/11/2026, na `main`, a compilação terminou com sucesso. O Vitest
registrou 1 teste aprovado e a suíte de integração com PostgreSQL 16 registrou
11 testes aprovados e 0 falhas.

A partir da pasta `backend`, com Node.js 24, execute:

```sh
npm ci
npm test
```

Para rodar a suíte de integração, defina `TEST_DATABASE_URL` no ambiente ou
no arquivo `backend/.env` com a URL de um banco PostgreSQL exclusivo de testes,
acessível ao Node.js. Execute, ainda na pasta `backend`:

```sh
npm run test:e2e
```

A suíte aplica as migrações e valida locais, produtos, alertas, filtros e
regras de movimentação, incluindo saldo insuficiente e saídas simultâneas.
A API de movimentações oferece criação (`POST /movimentacoes`) e consulta
(`GET /movimentacoes` e `GET /movimentacoes/:id`). A suíte verifica que
edição e exclusão diretas são rejeitadas com `HTTP 404`.
