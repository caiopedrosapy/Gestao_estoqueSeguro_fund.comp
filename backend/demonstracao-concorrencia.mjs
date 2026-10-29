// Execute apenas contra uma instância ligada a um banco exclusivo de testes.
const base = (process.env.API_URL || 'http://localhost:3000').replace(/\/$/, '');
async function requisicao(caminho, dados) {
  const resposta = await fetch(base + caminho, dados === undefined ? {} : {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const corpo = await resposta.json();
  return { status: resposta.status, corpo };
}
async function criar(caminho, dados) {
  const r = await requisicao(caminho, dados);
  if (r.status !== 201) throw new Error(`${caminho}: ${r.status} ${JSON.stringify(r.corpo)}`);
  return r.corpo;
}
try {
  const identificador = Date.now().toString();
  const local = await criar('/estoques', { nome: `Teste ${identificador}`, localizacao: 'Teste', alturaCm: 0, seguro: false });
  const produto = await criar('/produtos', { nome: `Produto ${identificador}`, categoria: 'Teste', estoqueId: local.id });
  await criar('/movimentacoes', { produtoId: produto.id, tipo: 'ENTRADA', quantidade: 10 });
  const saida = () => requisicao('/movimentacoes', { produtoId: produto.id, tipo: 'SAIDA', quantidade: 7 });
  console.log('Saldo inicial: 10 unidades');
  console.log('Enviando duas saídas concorrentes de 7 unidades...');
  const resultados = await Promise.all([saida(), saida()]);
  for (const [i, resultado] of resultados.entries()) console.log(`Solicitação ${i + 1}: HTTP ${resultado.status} - ${resultado.corpo.message || 'movimentação registrada'}`);
  const saldo = await requisicao(`/produtos/${produto.id}`);
  if (saldo.status !== 200) throw new Error(`Consulta falhou: HTTP ${saldo.status}`);
  console.log(`Saldo final: ${saldo.corpo.quantidade} unidades`);
  const codigos = resultados.map(r => r.status).sort((a, b) => a - b);
  if (codigos.join(',') !== '201,409' || saldo.corpo.quantidade !== 3) throw new Error('Resultado diferente do esperado.');
  console.log('RESULTADO: teste aprovado');
} catch (erro) {
  console.error('RESULTADO: teste não concluído:', erro.message);
  process.exitCode = 1;
}
