# 🌧️ Estoque Seguro

**Sistema de gestão de estoque para pequenos comércios em áreas sujeitas a alagamentos.**

O **Estoque Seguro** foi criado para ajudar comerciantes a controlar seus produtos e se preparar para períodos de chuva. O sistema reúne o controle de estoque e informações de risco em um único lugar, facilitando a identificação de produtos que precisam de reposição ou proteção.

## 📌 Sobre o projeto

Em pequenos comércios, o controle de produtos muitas vezes é feito por anotações ou pela memória do responsável. Isso dificulta saber o que realmente está disponível, o que precisa ser comprado e quais produtos devem receber atenção antes de um possível alagamento.

O Estoque Seguro busca tornar esse processo mais simples, permitindo que o comerciante acompanhe seu estoque e receba informações que auxiliem na preparação do estabelecimento.

## ✨ Principais recursos

* 📦 Cadastro de produtos
* ➕ Registro de entradas
* ➖ Registro de saídas
* 🔎 Consulta do estoque
* ⚠️ Identificação de produtos que precisam de atenção
* 🌧️ Alertas relacionados à chuva e risco de alagamento
* 📊 Visualização das informações do estoque

## 🖥️ Como funciona

O fluxo principal do sistema é:

```text
Cadastro do comércio
        ↓
Cadastro dos produtos
        ↓
Registro das entradas e saídas
        ↓
Atualização do estoque
        ↓
Consulta dos produtos
        ↓
Alerta de chuva / alagamento
        ↓
Identificação dos produtos que precisam ser protegidos
```



## Executar com Docker

Com o Docker e o Docker Compose v2 em execução, clone este repositório e abra
um terminal na pasta que contém o arquivo `compose.yaml`. Execute:

```sh
docker compose up --build --wait
docker compose ps
```

A primeira execução precisa de internet para baixar as imagens e dependências.
Abra [http://localhost:18080](http://localhost:18080) e confira se aparece
**Protótipo conectado**. O Compose configura o banco local e a API aplica as
migrações ao iniciar.

| Contêiner | Função |
| --- | --- |
| `frontend` | Nginx serve a interface HTML, CSS e JavaScript e encaminha as chamadas do navegador para as APIs. |
| `api` | API NestJS que processa as operações de estoque e salva os dados no PostgreSQL. |
| `clima` | Serviço NestJS que consulta medições de chuva da APAC. |
| `banco` | PostgreSQL 16, com os dados em um volume Docker. |

### Demonstrar o fluxo de estoque

1. Em **Locais**, use **Adicionar local** para criar um local de teste.
2. Em **Produtos**, use **Adicionar produto** e associe o produto ao local.
3. Em **Movimentações**, registre uma **Entrada** de 10 unidades para o produto.
4. Volte a **Produtos** e recarregue a página. O saldo deve mostrar 10 unidades
   e a entrada deve constar no histórico de **Movimentações**.

Na **Visão geral**, o botão **Consultar APAC** mostra as medições de chuva para
Palmares. A consulta depende da internet e da disponibilidade da APAC.

Para repetir o teste de concorrência e consultar os resultados da integração,
veja o [registro de testes](docs/TESTES.md).

Para encerrar, execute `docker compose down`. Os dados permanecem no volume.

## 👥 Equipe

**Estoque Seguro**

* Caio Pedrosa
* Rildo Neto
* David Henrique
* Alberto

**Organização parceira:** ACP
**Projeto:** 2026

## 🎯 Objetivo

Facilitar o controle de estoque de pequenos comércios e ajudar os responsáveis a tomar medidas preventivas para proteger mercadorias durante períodos de chuva e possíveis alagamentos.

## 📍 Contexto

O projeto tem como contexto inicial pequenos comércios de **Palmares, Pernambuco**, município que possui histórico de enchentes e alagamentos que podem afetar estabelecimentos comerciais.


---

**Estoque Seguro 🌧️📦**
*Mais organização para o estoque. Mais preparo para a possíveis enchentes.*
