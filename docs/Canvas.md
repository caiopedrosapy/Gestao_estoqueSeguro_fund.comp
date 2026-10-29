# Canvas do Projeto

> Preencha em **uma página**. Se não couber, o escopo está grande demais.
> Etapa 1 · Substitua os textos entre `<>`.

**Projeto:** `<Gestão de Estoque Seguro para Comércios em Áreas Alagáveis ·>`
**Equipe:** `<Caio Pedrosa - Rildo Neto - David Henrique - Alberto ·>`
**Data:** `<2026-09-20>`
**Organização parceira:** `ACP...`

---

## 1. Problema

> Na `<organização>`, `<quem>` precisa `<fazer o quê>`, mas hoje `<como é feito>`, o que
> causa `<qual consequência>`.

**Evidências de que o problema existe** (dados, falas, observação):

- Em pequenos comércios de áreas sujeitas a alagamento em Palmares, o proprietário precisa decidir o volume de compras e quais produtos proteger antes de períodos de chuva. No entanto, o histórico de vendas e estoque não é registrado de forma organizada, fazendo com que as decisões dependam apenas da memória e experiência do gestor. A ausência crônica desse controle administrativo acarreta prejuízos financeiros diretos para o comércio local, gerando tanto a falta crônica de produtos essenciais para as vendas quanto o excesso de mercadorias paradas em estoque.
-  A gravidade do problema é confirmada pelo histórico de enchentes no município, como o desastre de junho de 2010 relatado pelo portal G1. O transbordamento do Rio Una destruiu lojas do comércio e comprometeu severamente a economia local, comprovando o risco extremo a que esses comerciantes estão expostos sem ferramentas de planejamento.
  O projeto foi desenvolvido a partir de uma necessidade observada em pequenos comércios de Palmares.
Quando as vendas não são registradas, decisões de compra podem depender da memória e experiência do proprietário
-  https://g1.globo.com/pe/caruaru-regiao/noticia/2020/06/19/enchentes-que-atingiram-palmares-completam-10-anos-com-uma-barragem-entregue-cinco-foram-prometidas-em-2010.ghtml


## 2. Quem é afetado
| Quem | Quantas pessoas | Como é afetado hoje |
| :--- | :--- | :--- |
| **Proprietários de pequenos comércios (caso a ideia seja aprovada pela ACP, para o comércio de Palmares)** | em torno de 70 estabelecimento (pensando alto, pois no grupo da ACP tem em torno de 70). | Dificuldade para planejar compras e controlar perdas /gerenciamento de gastos em períodos chuvosos.  |
| **Funcionários responsáveis pelo estoque** | 2-3 p/ estabelecimento | Controle manual e dificuldade para identificar reposições |

## 3. Solução proposta

Em duas frases, sem jargão técnico:

O Estoque Seguro permite registrar produtos, entradas e saídas, manda alertas preventivos sobre o tempo, diminuindo o desperdício e alertando sobre suspeitas em áreas alagáveis.

>

## 4. Funcionalidades do MVP (5)

| # | Funcionalidade | Para quem | Por que é essencial |
|---|---|---|---|
| 1 |Cadastro e gerenciamento de produtos | Proprietários e funcionários responsáveis pelo estoque |Permite organizar os produtos armazenados, suas quantidades e demais informações necessárias para o controle do estoque. |
| 2 |Registro de entradas e saídas de produtos | Proprietários e funcionários responsáveis pelo estoque |Mantém o estoque atualizado e reduz a dependência de anotações manuais ou da memória do responsável.|
| 3 |Consulta da quantidade em estoque |Proprietários e funcionários responsáveis pelo estoque |Permite identificar rapidamente produtos em falta, excesso ou que precisam de reposição.|
| 4 |Alertas sobre risco de chuva ou alagamento |Proprietários de pequenos comércios |Ajuda o comerciante a se preparar antecipadamente e tomar medidas para proteger mercadorias em períodos de risco.|
| 5 |Identificação de produtos em situação de risco |Proprietários e funcionários responsáveis pelo estoque |Ajuda a priorizar quais mercadorias precisam ser protegidas ou movimentadas quando houver possibilidade de alagamento.|

## 5. Fora do escopo

O que **não** faremos nesta versão, e por quê:

| Não faremos | Por quê |
|---|---|
|Venda e pagamento de produtos pelo sistema |O objetivo do Estoque Seguro é o controle e a proteção do estoque, não funcionar como um sistema de vendas ou caixa. |
|Integração com sistemas de previsão meteorológica avançados |Nesta versão, serão utilizados alertas básicos de chuva ou risco de alagamento. Integrações mais complexas podem ser desenvolvidas futuramente. |
|Sistema de entrega ou transporte de mercadorias |O sistema ajudará a identificar produtos que precisam ser protegidos, mas não será responsável pelo transporte ou retirada dessas mercadorias. |
|Controle financeiro completo do comércio |O projeto poderá auxiliar indiretamente na redução de perdas, mas não terá funcionalidades completas de contabilidade, fluxo de caixa ou gestão financeira. |
|Previsão automática de enchentes e perdas futuras |O MVP não terá modelos avançados para prever exatamente quando ocorrerá uma enchente ou calcular o valor futuro das perdas. O foco será fornecer informações e alertas para apoiar a decisão do comerciante. |

## 6. Usuários e papéis

| Papel | O que pode fazer |
|---|---|
|Administrador / Proprietário|Possui acesso completo: cadastra e edita produtos, registra movimentações, visualiza relatórios de risco, configura dados do comércio e recebe alertas meteorológicos. |
|Operador / Funcionário|Realiza lançamentos diários de entrada e saída, consulta o saldo atual do estoque e visualiza quais produtos precisam ser movimentados com urgência em caso de alerta.|

## 7. Restrições

| Tipo | Restrição |
|---|---|
| Prazo | Semana 18 |
| Equipe | `<4>` pessoas, `<20>` h/semana no total |
| Técnica | TypeScript (NestJS + React), PostgreSQL, PaaS gratuita |
| Contexto de uso | `Computadores desktop, notebooks ou smartphones em balcões de atendimento e depósitos dos comércios em Palmares; conexão de internet banda larga ou dados móveis 3G/4G` |
| Orçamento | `R$ 0,00` |

## 8. Riscos principais

| Risco | O que faremos |
|---|---|
| Baixa adesão ou resistência dos comerciantes em utilizar o sistema| Desenvolver uma interface intuitiva, simples de operar

## 9. Critérios de sucesso

| Objetivo | Como mediremos | Meta |
|---|---|---|
| Satisfação do comerciante no alerta e organização| Pesquisa de satisfação (feedback direto) aplicada aos proprietários participantes| 70% ~ 80% ou mais de aprovação|

## 10. O que fica depois

- **Quem opera o sistema:** Os proprietários e funcionários das lojas parceiras da ACP em Palmares.
- **Quem mantém tecnicamente:** A equipe
- **Custo mensal estimado:** R$ 0,00
- **Licença do código:** Licença Open Source
