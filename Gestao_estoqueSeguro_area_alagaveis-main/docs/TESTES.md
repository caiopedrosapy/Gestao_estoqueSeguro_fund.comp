# Registro de Testes do Sistema

## Integrantes da Equipe

|Fez| Nome do Integrante |Ambiente de execução |
| :--- | :--- | :--- |
|Produtos|Caio|Powershell|
|Estoque|David|Thunder Client|
|Movimentação|Alberto|Postman|
|Alertas|Rildo|Postman|

>Nota: Cada membro da equipe fez os teste de maneira separada, com equipamentos diferentes e meios diferentes de execução.

---
* [Link Branches]([https://github.com/seu-usuario/seu-repositorio](https://github.com/caiopedrosapy/Gestao_estoqueSeguro_area_alagaveis/branches))
---
## Validação Geral do Projeto

| Item / Comando | Resultado do Teste |
| :--- | :--- |
| **Branch de Execução** | `main` |
| **Compilação (`npm run build`)** | **OK** — Projeto compilado sem erros de build |
| **Suíte de Testes (`npm test`)** | **OK** — Todos os testes unitários passaram |

---

## Suíte de Testes por Módulo

### 1. Módulo: Alertas (`/alertas`)

| Ação / Rota | Descrição do Cenário de Teste | Status / Resultado Esperado |
| :--- | :--- | :--- |
| `POST /alertas` | Criação de um novo alerta | **OK** (Status 201 Created) |
| `GET /alertas` | Listagem geral de alertas | **OK** (Status 200 OK) |
| `GET /alertas/1` | Consulta de alerta por ID existente | **OK** (Status 200 OK) |
| `GET /alertas/999` | Consulta com ID inexistente | **OK** (Status 404 Not Found) |
| `PATCH /alertas/1` | Atualização parcial do alerta | **OK** (Status 200 OK) |
| `DELETE /alertas/1` | Remoção do alerta | **OK** (Status 200 OK) |

---

### 2. Módulo: Estoques (`/estoques`)

| Ação / Rota | Descrição do Cenário de Teste | Status / Resultado Esperado |
| :--- | :--- | :--- |
| `POST /estoques` | Cadastro de novo item de estoque | **OK** (Status 201 Created) |
| `GET /estoques` | Listagem completa de estoques | **OK** (Status 200 OK) |
| `GET /estoques/1` | Consulta de item de estoque por ID | **OK** (Status 200 OK) |
| `PATCH /estoques/1` | Atualização de quantidade/dados de estoque | **OK** (Status 200 OK) |
| `DELETE /estoques/1` | Exclusão de registro de estoque | **OK** (Status 200 OK) |

---

### 3. Módulo: Movimentações (`/movimentacoes`)

| Ação / Rota | Descrição do Cenário de Teste | Status / Resultado Esperado |
| :--- | :--- | :--- |
| `POST /movimentacoes` | Registro de entrada/saída de produto | **OK** (Status 201 Created) |
| `GET /movimentacoes` | Listagem de histórico de movimentações | **OK** (Status 200 OK) |
| `GET /movimentacoes/1` | Consulta de movimentação específica | **OK** (Status 200 OK) |
| `PATCH /movimentacoes/1` | Ajuste em registro de movimentação | **OK** (Status 200 OK) |
| `DELETE /movimentacoes/1` | Cancelamento/exclusão de movimentação | **OK** (Status 200 OK) |

---

### 4. Módulo: Produtos (`/produtos`)

| Ação / Rota | Descrição do Cenário de Teste | Status / Resultado Esperado |
| :--- | :--- | :--- |
| `POST /produtos` | Cadastro de novo produto | **OK** (Status 201 Created) |
| `GET /produtos` | Listagem geral do catálogo de produtos | **OK** (Status 200 OK) |
| `GET /produtos/1` | Consulta de produto por ID | **OK** (Status 200 OK) |
| `GET /produtos/999` | Consulta com ID inexistente | **OK** (Status 404 Not Found) |
| `PATCH /produtos/1` | Atualização de preço/dados do produto | **OK** (Status 200 OK) |
| `DELETE /produtos/1` | Remoção do produto do sistema | **OK** (Status 200 OK) |

---

## Resumo dos Resultados

| Módulo | Total de Testes | Sucesso | Falhas |
| :--- | :--- | :--- | :--- |
| **Alertas** | 6 | 6 | 0 |
| **Estoques** | 5 | 5 | 0 |
| **Movimentações** | 5 | 5 | 0 |
| **Produtos** | 6 | 6 | 0 |
| **Total do Sistema** | **22** | **22** | **0** |

> **Resultado Final:** Todos os cenários de testes executados em todos os módulos apresentaram os resultados esperados, confirmando a integridade das rotas do sistema.
