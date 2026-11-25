'use strict';

const paths={shield:'M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z M8.5 12l2.5 2.5 4.5-5',store:'M3 10h18L19 4H5l-2 6Z M4 10v10h16V10 M9 20v-6h6v6 M3 10c0 3 4 3 4 0 0 3 5 3 5 0 0 3 5 3 5 0 0 3 4 3 4 0',dashboard:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',box:'m12 3 9 5v9l-9 5-9-5V8l9-5Z M3 8l9 5 9-5 M12 13v9 M7.5 5.5l9 5',arrows:'M4 7h15m-4-4 4 4-4 4 M20 17H5m4-4-4 4 4 4',pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',layers:'m12 3 10 5-10 5L2 8l10-5Z M2 12l10 5 10-5 M2 16l10 5 10-5',help:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M9.2 8.2c1-3 6-2 5.6 1-.2 2-2.8 2.2-2.8 4 M12 17h.01', 'arrow-right':'M4 12h16m-5-5 5 5-5 5','arrow-up-right':'M6 18 18 6 M6 6h12v12',chevrons:'m8 9 4-4 4 4 m-8 6 4 4 4-4',menu:'M4 6h16 M4 12h16 M4 18h16',plus:'M12 5v14 M5 12h14',download:'M12 3v12m-5-5 5 5 5-5 M4 16v5h16v-5',search:'M20 20l-5-5 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',warning:'m12 3 10 18H2L12 3Z M12 9v5 M12 17h.01',trend:'m3 16 6-6 4 4 8-9 M15 5h6v6',calendar:'M4 5h16v16H4z M8 2v6 M16 2v6 M4 10h16',grain:'M12 3v19 M12 8C8 8 5 5 5 2c4 0 7 2 7 6Z M12 13c-4 0-7-3-7-6 4 0 7 2 7 6Z M12 18c-4 0-7-3-7-6 4 0 7 2 7 6Z M12 10c4 0 7-3 7-6-4 0-7 2-7 6Z M12 16c4 0 7-3 7-6-4 0-7 2-7 6Z',drop:'M12 2c-2 4-8 9-8 14a8 8 0 0 0 16 0c0-5-6-10-8-14Z M8 16c0 2 1 3 3 3',bottle:'M9 2h6v4l3 4v11H6V10l3-4V2Z M9 6h6 M6 14h12',package:'M5 3h14v18H5z M5 8h14 M9 3v5 M9 12h6 M9 16h4',star:'m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1 3-6Z',edit:'m15 4 5 5 M4 20l5-1L21 7l-5-5L4 14v6Z',trash:'M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7',close:'m6 6 12 12 M18 6 6 18',check:'m5 12 4 4L19 6',clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 6v6l4 2',lock:'M6 11h12v10H6z M8 11V7a4 4 0 0 1 8 0v4',play:'m8 4 12 8-12 8V4Z',refresh:'M20 8a8 8 0 1 0 0 9 M20 3v5h-5',in:'M12 3v13m-5-5 5 5 5-5 M4 18v4h16v-4',out:'M12 16V3m-5 5 5-5 5 5 M4 18v4h16v-4',info:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 11v6 M12 7h.01',building:'M4 22V4h12v18 M16 11h4v11 M8 8h4 M8 12h4 M8 16h4 M9 22v-3h2v3',cloud:'M6 18a5 5 0 0 1 0-10 7 7 0 0 1 13 0 5 5 0 0 1 0 10 M7 21l1-2 M12 21l1-2 M17 21l1-2'};
const icon=(name)=>`<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${paths[name]||paths.box}"/></svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=v=>Number(v).toLocaleString('pt-BR');
const today=new Date();
const dateText=d=>new Date(d).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
const timeText=d=>new Date(d).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});

const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const palette={Alimentos:['#f5efdc','#b89d56','grain'],Bebidas:['#eaf2ef','#7ba593','drop'],Limpeza:['#e9eff8','#91a8c5','bottle'],Higiene:['#f0eaf3','#a68aaf','package'],Outros:['#edf2e7','#94a07c','box']};
let state = {locations: [], products: [], movements: [], alerts: []};
let apiReady = false;
let climate = { loading: false, message: '', data: null };

async function api(path, options = {}) {
  let response;
  try {
    response = await fetch('/api' + path, {
      ...options,
      headers: { ...(options.body ? {'Content-Type': 'application/json'} : {}), ...options.headers },
      cache: 'no-store',
    });
  } catch {
    throw new Error('Não foi possível conectar à API de estoque. Verifique os serviços.');
  }
  const type = response.headers.get('content-type') || '';
  const body = type.includes('application/json') ? await response.json() : null;
  if (!response.ok) {
    const message = body?.message;
    throw new Error(Array.isArray(message) ? message.join(' ') : message || `A API respondeu com HTTP ${response.status}.`);
  }
  return body;
}
const idText = value => String(value);
const levelFromApi = value => ({ALTO:'Alto', MEDIO:'Medio', BAIXO:'Baixo'})[value] || value;
const levelToApi = value => ({Alto:'ALTO', Medio:'MEDIO', Baixo:'BAIXO'})[value];

async function refreshData() {
  try {
    const [locations, products, movements, alerts] = await Promise.all([
      api('/estoques'), api('/produtos'), api('/movimentacoes'), api('/alertas'),
    ]);
    state = {
      locations: locations.map(l => ({id:idText(l.id), name:l.nome, address:l.localizacao, heightCm:l.alturaCm, risk:l.seguro ? 'Baixo' : 'Alto'})),
      products: products.map(p => ({id:idText(p.id), name:p.nome, category:p.categoria, qty:p.quantidade, locationId:idText(p.estoqueId), priority:p.prioritario})),
      movements: movements.map(m => ({id:idText(m.id), productId:idText(m.produtoId), type:m.tipo, qty:m.quantidade, at:m.criadaEm})),
      alerts: alerts.map(a => ({id:idText(a.id), title:a.titulo, description:a.descricao, locationId:idText(a.estoqueId), level:levelFromApi(a.nivel), active:a.ativo, at:a.criadoEm})),
    };
    apiReady = true;
    connectionStatus(true);
    render();
    return true;
  } catch (error) {
    apiReady = false;
    connectionStatus(false);
    render();
    toast(error.message, true);
    return false;
  }
}

function connectionStatus(connected) {
  const notice = document.getElementById('connection-notice');
  notice.querySelector('b').textContent = connected ? 'Protótipo conectado' : 'API indisponível';
  notice.querySelector('p span').textContent = connected
    ? 'Os dados são salvos no PostgreSQL pela API de estoque.'
    : 'Confira os serviços e tente conectar novamente.';
  document.getElementById('connection-state').textContent = connected ? 'Dados na API · PostgreSQL' : 'Sem conexão com a API';
}

function requireApi() {
  if (apiReady) return true;
  toast('A API está indisponível. Reconecte antes de alterar os dados.', true);
  return false;
}

async function consultClimate() {
  climate = {loading:true, message:'', data:null};
  render();
  try {
    const response = await fetch('/clima-api/clima?municipio=Palmares', {cache:'no-store'});
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Não foi possível consultar a APAC.');
    climate = {loading:false, message:'', data};
  } catch (error) {
    climate = {loading:false, message:error.message || 'Serviço climático indisponível.', data:null};
  }
  render();
}

function climateCard() {
  let result = '<p>Consulte os dados de chuva acumulada das estações da APAC em Palmares.</p>';
  if (climate.loading) result = '<p>Consultando a APAC...</p>';
  else if (climate.message) result = `<p>${esc(climate.message)}</p>`;
  else if (climate.data) {
    const stations = climate.data.estacoes || [];
    result = stations.length ? `<p>${stations.map(s => `${esc(s.estacao)}: <b>${s.chuvaAcumulada?.vinteEQuatroHoras == null ? 'sem medição' : `${num(s.chuvaAcumulada.vinteEQuatroHoras)} mm em 24 h`}</b>`).join('<br>')}</p>` : '<p>Nenhuma estação encontrada para este município.</p>';
  }
  return `<section class="panel page-panel"><div class="panel-header"><div><h2>Chuva em Palmares</h2><p>Consulta à APAC · medição, não previsão</p></div></div><div style="padding:0 24px 24px">${result}<button class="btn" data-action="check-climate" ${climate.loading ? 'disabled' : ''}>${icon('cloud')}Consultar APAC</button></div></section>`;
}
let page='dashboard',search='',locationFilter='',statusFilter='',movementFilter='',alertFilter='active';
let sim={mode:'protected',running:false,step:0,done:false};
let simTimers=[];
const main=document.getElementById('main'),modal=document.getElementById('modal');
const locationName=id=>state.locations.find(x=>x.id===id)?.name||'Local removido';
const productById=id=>state.products.find(x=>x.id===id);
const activeAlerts=()=>state.alerts.filter(a=>a.active);
const atRisk=p=>p.qty>0&&activeAlerts().some(a=>a.level==='Alto'&&a.locationId===p.locationId)&&state.locations.some(l=>l.id===p.locationId&&l.risk==='Alto');
const zeroStock = p => p.qty === 0;
const alertLevelLabel = level => level === 'Medio' || level === 'Moderado' ? 'médio' : String(level).toLocaleLowerCase('pt-BR');
const tag=(text,color)=>`<span class="tag ${color}">${esc(text)}</span>`;
const productIcon=p=>{const c=palette[p.category]||palette.Outros;return `<span class="product-thumbnail" style="background:${c[0]};color:${c[1]}">${icon(c[2])}</span>`;};
function hydrate(){document.querySelectorAll('[data-icon]').forEach(e=>e.innerHTML=icon(e.dataset.icon));}
function toast(message,error=false){const e=document.createElement('div');e.className='toast'+(error?' error':'');e.innerHTML=icon(error?'warning':'check')+`<span>${esc(message)}</span>`;document.getElementById('toasts').append(e);setTimeout(()=>e.remove(),4500);}
function navigate(target){location.hash=target;if(page===target)render();}
const pageNames={dashboard:'Visão geral',products:'Produtos',movements:'Movimentações',locations:'Locais',alerts:'Alertas',simulation:'Teste de concorrência'};
function heading(title,subtitle,actions='',eyebrow='SEU ESTOQUE, SOB CONTROLE'){return `<div class="page-heading"><div><p class="eyebrow">${eyebrow==='SEU ESTOQUE, SOB CONTROLE'?icon('shield'):icon('calendar')}${esc(eyebrow)}</p><h1>${title}</h1><p class="subtitle">${subtitle}</p></div><div class="heading-actions">${actions}</div></div>`;}
function btn(text,action,ic='plus',primary=true,extra=''){return `<button class="btn${primary?' primary':''}" data-action="${action}" ${extra}>${icon(ic)}${text}</button>`;}
function stats() {
  const totals = state.products.reduce((sum, product) => sum + product.qty, 0);
  const atRiskCount = state.products.filter(atRisk).length;
  const withoutBalance = state.products.filter(zeroStock).length;
  const items = [
    ['Produtos cadastrados', state.products.length, 'box', `Em ${state.locations.length} locais de armazenamento`, false],
    ['Unidades em estoque', num(totals), 'layers', 'Saldo atualizado por movimentações', false],
    ['Produtos em risco', atRiskCount, 'shield', 'Alerta alto ativo em local vulnerável', atRiskCount > 0],
    ['Produtos sem saldo', withoutBalance, 'warning', 'Itens com quantidade igual a zero', withoutBalance > 0],
  ];
  return `<div class="stats-grid">${items.map(([label, value, symbol, sub, highlight]) => `
    <div class="stat-card"><div class="stat-top">${label}<span class="stat-icon"${highlight ? ' style="background:#fbf3e1;color:#b29a62"' : ''}>${icon(symbol)}</span></div>
    <div class="stat-value">${value}${symbol === 'layers' ? '<small>un.</small>' : ''}</div>
    <div class="stat-bottom">${icon(symbol === 'shield' ? 'pin' : symbol === 'warning' ? 'info' : 'check')}<span>${sub}</span></div></div>`).join('')}</div>`;
}
function chart(){const days=Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()-6+i);return d;});let inTotal=0,outTotal=0;const vals=days.map(d=>{const key=d.toDateString();const ms=state.movements.filter(m=>new Date(m.at).toDateString()===key);const entry=ms.filter(m=>m.type==='ENTRADA').reduce((s,m)=>s+m.qty,0),out=ms.filter(m=>m.type==='SAIDA').reduce((s,m)=>s+m.qty,0);inTotal+=entry;outTotal+=out;return [entry,out];});const max=Math.max(80,...vals.flat());const svg=`<svg viewBox="0 0 560 151" role="img" aria-label="Gráfico de entradas e saídas nos últimos sete dias">${[0,1,2,3].map(i=>`<line x1="29" x2="552" y1="${15+i*35}" y2="${15+i*35}" stroke="#edf1e9" stroke-dasharray="3 4"/><text x="0" y="${18+i*35}">${Math.round(max*(1-i/3))}</text>`).join('')}${vals.map((v,i)=>{const x=56+i*73;return `<rect x="${x}" y="${120-v[0]/max*105}" width="17" height="${v[0]/max*105}" rx="3" fill="#3b7860"/><rect x="${x+22}" y="${120-v[1]/max*105}" width="17" height="${v[1]/max*105}" rx="3" fill="#c7dba6"/><text text-anchor="middle" x="${x+18}" y="143">${days[i].toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}</text>`;}).join('')}</svg>`;return `<section class="panel"><div class="panel-header"><div><h2>Movimentações do estoque</h2><p>Entradas e saídas nos últimos 7 dias</p></div><div class="chart-legend"><span><i class="legend-dot"></i>Entradas</span><span><i class="legend-dot light"></i>Saídas</span></div></div><div class="chart">${svg}</div><div class="chart-summary"><span><b>${num(inTotal)} unidades</b> recebidas</span><span><b>${num(outTotal)} unidades</b> retiradas</span><span>Dados da API</span></div></section>`;}
function filteredProducts() {
  const matched = state.products.filter(p => {
    const matchesSearch = !search || `${p.name} ${p.category}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'));
    const matchesLocation = !locationFilter || p.locationId === locationFilter;
    const matchesStatus = !statusFilter || (statusFilter === 'risk' && atRisk(p)) || (statusFilter === 'zero' && zeroStock(p)) || (statusFilter === 'stock' && p.qty > 0);
    return matchesSearch && matchesLocation && matchesStatus;
  });
  // A consulta de produtos em risco do backend exibe prioritários primeiro.
  return statusFilter === 'risk'
    ? matched.slice().sort((a, b) => Number(b.priority) - Number(a.priority))
    : matched;
}
function productRows(products) {
  return products.map(p => `<tr>
    <td><div class="product-cell">${productIcon(p)}<span><b>${esc(p.name)}</b><small>${esc(p.category)}</small></span></div></td>
    <td><span class="quantity">${num(p.qty)}<small>un.</small></span></td>
    <td>${esc(locationName(p.locationId))}</td>
    <td>${atRisk(p) ? tag('Em risco', 'amber') : zeroStock(p) ? tag('Sem saldo', 'red') : tag('Com saldo', 'green')}</td>
    <td><span class="priority ${p.priority ? 'is-priority' : ''}" title="${p.priority ? 'Produto prioritário' : 'Prioridade normal'}" aria-label="${p.priority ? 'Produto prioritário' : 'Prioridade normal'}">${icon('star')}</span></td>
    <td><div class="table-actions"><button class="icon-button" data-action="edit-product" data-id="${esc(p.id)}" aria-label="Editar ${esc(p.name)}">${icon('edit')}</button><button class="icon-button" data-action="delete-product" data-id="${esc(p.id)}" aria-label="Remover ${esc(p.name)}">${icon('trash')}</button></div></td>
  </tr>`).join('');
}
function productTable(compact = false) {
  const products = filteredProducts();
  const shown = compact ? products.slice(0, 5) : products;
  return `<section class="panel page-panel">
    <div class="panel-header"><div><h2>${compact ? 'Seu estoque' : 'Todos os produtos'}</h2><p>${compact ? 'Acompanhe seus produtos e suas quantidades.' : 'Consulte os produtos, locais e prioridades.'}</p></div>${compact ? `<button class="text-button" data-action="view-products">Ver todos ${icon('arrow-right')}</button>` : tag(state.products.length + ' produtos', 'neutral')}</div>
    <div class="toolbar"><label class="search-wrap"><span>${icon('search')}</span><input id="product-search" type="search" placeholder="Buscar produto ou categoria..." aria-label="Buscar produto ou categoria" value="${esc(search)}"></label>
      <select id="location-filter" class="filter-select" aria-label="Filtrar por local"><option value="">Todos os locais</option>${state.locations.map(l => `<option value="${esc(l.id)}" ${locationFilter === l.id ? 'selected' : ''}>${esc(l.name)}</option>`).join('')}</select>
      <select id="status-filter" class="filter-select" aria-label="Filtrar por situação"><option value="">Todas as situações</option><option value="risk" ${statusFilter === 'risk' ? 'selected' : ''}>Em risco</option><option value="zero" ${statusFilter === 'zero' ? 'selected' : ''}>Sem saldo</option><option value="stock" ${statusFilter === 'stock' ? 'selected' : ''}>Com saldo</option></select></div>
    <div class="table-wrap"><table><thead><tr><th>Produto</th><th>Quantidade</th><th>Local</th><th>Situação</th><th>Prior.</th><th>Ações</th></tr></thead><tbody id="product-rows">${productRows(shown)}</tbody></table>
      <div id="product-empty" ${shown.length ? 'hidden' : ''} class="empty-state">${icon('search')}<b>Nenhum produto encontrado</b><p>Experimente outro termo ou ajuste os filtros.</p></div></div>
    <div class="table-footer"><span id="product-results">Exibindo ${shown.length} de ${products.length} produtos</span><button data-action="${compact ? 'view-products' : 'clear-filters'}">${compact ? 'Ver estoque completo →' : 'Limpar filtros'}</button></div>
  </section>`;
}
function updateProductResults(){const filtered=filteredProducts(),shown=page==='dashboard'?filtered.slice(0,5):filtered;document.getElementById('product-rows').innerHTML=productRows(shown);document.getElementById('product-empty').hidden=shown.length>0;document.getElementById('product-results').textContent=`Exibindo ${shown.length} de ${filtered.length} produtos`;}
function alertPreview(){const alerts=activeAlerts();return `<section class="panel"><div class="panel-header"><h2>Alertas ativos</h2><span class="tiny-badge">${alerts.length} ${alerts.length===1?'alerta':'alertas'}</span></div>${alerts.length?alerts.slice(0,2).map(a=>`<div class="alert-item"><span class="alert-symbol ${a.level==='Alto'?'':'medium'}">${icon(a.level==='Alto'?'cloud':'shield')}</span><div><b>${esc(a.title)}</b><p>${esc(locationName(a.locationId))}<br>${a.level==='Alto'?'Confira os produtos deste local.':'Mantenha os cuidados preventivos.'}</p><small>Alerta manual · ${dateText(a.at)}</small></div></div>`).join(''):'<div class="empty-state">'+icon('shield')+'Nenhum alerta ativo.</div>'}<button class="panel-bottom-link" data-action="view-alerts">Gerenciar alertas ${icon('arrow-right')}</button></section>`;}
function locationsPreview(){return `<section class="panel"><div class="panel-header"><h2>Locais de armazenamento</h2><span class="tiny-badge">${state.locations.length} locais</span></div>${state.locations.slice(0,3).map(l=>`<div class="location-compact"><span class="location-symbol">${icon('building')}</span><div><b>${esc(l.name)}</b><small>${state.products.filter(p=>p.locationId===l.id).length} produtos cadastrados</small></div>${tag(l.risk==='Alto'?'Vulnerável':'Protegido',l.risk==='Alto'?'amber':'green')}</div>`).join('')}<button class="panel-bottom-link" data-action="view-locations">Ver todos os locais ${icon('arrow-right')}</button></section>`;}
function dashboard() {
  const risk = state.products.filter(atRisk).length;
  return heading('Visão geral', 'Tudo o que você precisa para acompanhar e proteger seu estoque.', btn('Nova movimentação', 'add-movement', 'arrows', false) + btn('Adicionar produto', 'add-product'), today.toLocaleDateString('pt-BR', {weekday:'long', day:'numeric', month:'long', year:'numeric'})) +
    `<div class="attention-banner"><span class="attention-icon">${icon('shield')}</span><div><b>${risk ? 'Produtos precisam de atenção.' : 'Nenhum produto está em risco pelos alertas ativos.'}</b><p>${risk ? `${risk} produtos têm saldo em locais vulneráveis com alerta alto cadastrado.` : 'Os alertas são cadastrados manualmente.'}</p></div><button data-action="view-risk">Ver produtos ${icon('arrow-right')}</button></div>` +
    stats() + `<div class="dashboard-grid"><div class="left-column">${chart()}${productTable(true)}</div><div class="right-column">${alertPreview()}${locationsPreview()}${climateCard()}<section class="demo-card"><p class="eyebrow">NA PRÁTICA · CONCORRÊNCIA</p><h3>Dois pedidos.<br>Um estoque protegido.</h3><p>Compare o resultado de duas saídas quando há coordenação das operações.</p><button data-action="view-simulation">Explorar demonstração ${icon('arrow-up-right')}</button></section></div></div>`;
}
function productsPage(){return heading('Produtos','Seu inventário organizado. Cada item, quantidade e prioridade em um só lugar.',btn('Exportar CSV','export','download',false)+btn('Adicionar produto','add-product'))+stats()+productTable();}
function movementsPage() {
  const rows = state.movements.filter(m => !movementFilter || m.type === movementFilter).slice().sort((a, b) => new Date(b.at) - new Date(a.at));
  return heading('Movimentações', 'Registre entradas e saídas e acompanhe o histórico dos produtos.', btn('Nova movimentação', 'add-movement', 'arrows')) +
    `<div class="note-banner">${icon('shield')}<p>O saldo muda a cada movimentação. A API recusa saídas maiores que a quantidade disponível.</p></div>
    <section class="panel"><div class="panel-header"><div><h2>Histórico de movimentações</h2><p>Registros recebidos da API</p></div><span class="tiny-badge">${state.movements.length} registros</span></div>
    <div class="filter-tabs">${[['','Todas'],['ENTRADA','Entradas'],['SAIDA','Saídas']].map(([v, label]) => `<button class="filter-tab ${movementFilter === v ? 'active' : ''}" data-action="movement-filter" data-id="${v}">${label}</button>`).join('')}</div>
    <div class="table-wrap"><table><thead><tr><th>Tipo</th><th>Produto</th><th>Quantidade</th><th>Local atual</th><th>Data</th></tr></thead><tbody>${rows.map(m => {
      const product = productById(m.productId);
      return `<tr><td><span class="activity-icon ${m.type === 'SAIDA' ? 'out' : ''}">${icon(m.type === 'ENTRADA' ? 'in' : 'out')}</span>${m.type === 'ENTRADA' ? 'Entrada' : 'Saída'}</td><td>${esc(product?.name || m.productName || 'Produto removido')}</td><td><span class="movement-number ${m.type === 'SAIDA' ? 'out' : ''}">${m.type === 'ENTRADA' ? '+' : '−'}${num(m.qty)} un.</span></td><td>${product ? esc(locationName(product.locationId)) : 'Não disponível'}</td><td>${dateText(m.at)} <span style="color:#a6b09f">· ${timeText(m.at)}</span></td></tr>`;
    }).join('')}</tbody></table>${rows.length ? '' : '<div class="empty-state">' + icon('arrows') + '<b>Sem movimentações neste filtro</b></div>'}</div>
    <div class="table-footer">${rows.length} ${rows.length === 1 ? 'movimentação' : 'movimentações'} exibidas<span>Dados do PostgreSQL</span></div></section>`;
}
function locationsPage() {
  return heading('Locais de armazenamento', 'Acompanhe os locais e identifique quais foram cadastrados como vulneráveis.', btn('Adicionar local', 'add-location', 'pin')) +
    `<div class="locations-grid">${state.locations.map(l => {
      const products = state.products.filter(p => p.locationId === l.id);
      const height = Number.isInteger(l.heightCm) ? `${num(l.heightCm)} cm de altura` : 'Altura não informada';
      return `<article class="location-card"><div class="location-card-top"><span class="large-icon">${icon('building')}</span>${tag(l.risk === 'Alto' ? 'Vulnerável' : 'Protegido', l.risk === 'Alto' ? 'amber' : 'green')}</div>
        <h2>${esc(l.name)}</h2><p>${esc(l.address || 'Localização não informada')}<br>${height}</p>
        <div class="location-metrics"><div><b>${products.length}</b><small>produtos cadastrados</small></div><div><b>${num(products.reduce((sum, p) => sum + p.qty, 0))}</b><small>unidades em estoque</small></div></div>
        <div class="location-card-bottom"><button class="text-button" data-action="location-products" data-id="${esc(l.id)}">Ver produtos ${icon('arrow-right')}</button><button class="btn" data-action="edit-location" data-id="${esc(l.id)}">${icon('edit')}Editar local</button></div></article>`;
    }).join('')}</div>`;
}
function alertsPage(){const alerts=state.alerts.filter(a=>alertFilter==='all'||a.active===(alertFilter==='active')).sort((a,b)=>Number(b.active)-Number(a.active));return heading('Alertas e prevenção','Informações para agir a tempo e proteger os produtos mais importantes.',btn('Cadastrar alerta','add-alert','bell'))+`<div class="note-banner">${icon('info')}<p>Os alertas são cadastrados manualmente. A consulta à APAC mostra medições de chuva e não cria alertas automaticamente.</p></div><div class="filter-tabs" style="padding-left:0">${[['active','Ativos'],['resolved','Resolvidos'],['all','Todos']].map(([v,label])=>`<button class="filter-tab ${alertFilter===v?'active':''}" data-action="alert-filter" data-id="${v}">${label}</button>`).join('')}</div><div class="alerts-grid">${alerts.map(a=>`<article class="alert-card ${a.active?'':'resolved'}"><div class="alert-card-top"><span class="large-icon">${icon(a.level==='Alto'?'cloud':'shield')}</span>${tag(a.active?'Nível '+alertLevelLabel(a.level):'Resolvido',a.active?(a.level==='Alto'?'amber':'green'):'neutral')}</div><h2>${esc(a.title)}</h2><p>${esc(a.description)}</p><div class="alert-details"><span>${icon('pin')} ${esc(locationName(a.locationId))}</span><span>${icon('calendar')} ${dateText(a.at)}</span></div><div class="alert-card-bottom"><span>Cadastro manual</span><div>${a.active?`<button class="text-button" data-action="resolve-alert" data-id="${esc(a.id)}">${icon('check')}Marcar como resolvido</button>`:`<button class="text-button" data-action="reopen-alert" data-id="${esc(a.id)}">${icon('refresh')}Reativar alerta</button>`}</div></div></article>`).join('')||'<div class="panel empty-state">'+icon('shield')+'<b>Nenhum alerta neste filtro</b><p>Cadastre um alerta ou consulte outra situação.</p></div>'}</div>`;}
function simulationPage() {
  const guarded = sim.mode === 'protected';
  const modeLabel = guarded ? 'COM COORDENAÇÃO' : 'SEM COORDENAÇÃO';
  let resultHeading = 'Aguardando os pedidos';
  let resultText = 'Execute a simulação para acompanhar os dois pedidos.';
  if (sim.running) { resultHeading = 'Pedidos em andamento'; resultText = 'Acompanhe as etapas ao lado.'; }
  if (sim.done && guarded) { resultHeading = 'Uma saída aceita'; resultText = 'Foram registradas 7 unidades de saída. O saldo permanece consistente.'; }
  if (sim.done && !guarded) { resultHeading = 'Duas saídas aceitas'; resultText = 'Foram registradas 14 unidades de saída, embora existissem apenas 10.'; }
  const presenting = document.body.classList.contains('presentation-mode');
  const presentationButton = btn(presenting ? 'Sair da apresentação' : 'Modo apresentação', 'toggle-presentation', 'layers', false);
  return heading('Teste de concorrência', 'Veja como duas saídas podem disputar o saldo de um mesmo produto.', presentationButton + btn('Reiniciar', 'reset-simulation', 'refresh', false), 'LABORATÓRIO DO PROJETO') +
    `<div class="sim-intro"><div><p class="eyebrow" style="color:#c7ddb4">UM MESMO PRODUTO, DOIS PEDIDOS</p><h2>E se duas pessoas tentarem retirar o mesmo produto?</h2><p>Com 10 unidades disponíveis, dois clientes solicitam a saída de 7 unidades cada. Selecione um cenário e acompanhe o que acontece.</p></div><div class="sim-number"><strong>10</strong><span>unidades no início</span></div></div>
    <div class="simulation-grid"><section class="panel sim-main-panel"><div class="panel-header"><div><p class="sim-kicker">${modeLabel}</p><h2>Dois pedidos de saída</h2><p>Cada cliente solicita 7 unidades do mesmo produto.</p></div><span class="tiny-badge">Ilustração interativa</span></div>
    <div class="sim-controls"><div class="segmented" aria-label="Cenário da simulação"><button data-action="sim-mode" data-id="protected" class="${guarded ? 'selected' : ''}" aria-pressed="${guarded}" ${sim.running ? 'disabled' : ''}>${icon('lock')} Com proteção</button><button data-action="sim-mode" data-id="unprotected" class="${!guarded ? 'selected' : ''}" aria-pressed="${!guarded}" ${sim.running ? 'disabled' : ''}>Sem proteção</button></div><button class="btn primary sim-run" data-action="run-simulation" ${sim.running ? 'disabled' : ''}>${icon('play')}${sim.running ? 'Simulando...' : sim.done ? 'Executar novamente' : 'Executar simulação'}</button></div>
    <div class="request-grid">${requestCard('A', 1)}${requestCard('B', 2)}</div>
    <div class="sim-result ${sim.done && !guarded ? 'inconsistent' : ''}" aria-live="polite"><strong>${sim.done ? '3' : '10'}<small> un.</small></strong><div><b>${resultHeading}</b><p>${resultText}</p></div></div>
    <div class="simulation-explanation">${guarded ? '<b>Com proteção:</b> a segunda operação aguarda a primeira e verifica o saldo atualizado antes de continuar.' : '<b>Sem proteção:</b> cenário hipotético em que os dois pedidos leem saldo 10 e cada um grava saldo 3. O histórico fica inconsistente.'}</div></section>
    <section class="panel sim-steps-panel"><div class="panel-header"><div><p class="sim-kicker">PASSO A PASSO</p><h2>O que acontece por dentro</h2><p>${guarded ? 'Uma operação aguarda a outra' : 'Os dois pedidos usam a mesma leitura'}</p></div>${icon(guarded ? 'shield' : 'warning')}</div><div class="timeline">${timelineSteps().map((s, i) => `<div class="timeline-item ${sim.step > i ? 'active' : ''}"><div class="timeline-marker"><span>${sim.step > i ? icon('check') : i + 1}</span></div><div><b>${s[0]}</b><small>${s[1]}</small></div></div>`).join('')}</div><p class="sim-order-note">${guarded ? 'A ordem é ilustrativa: qualquer cliente pode ser atendido primeiro.' : 'A ausência de coordenação é uma hipótese para explicar o problema.'}</p></section></div>
    <section class="reference-result"><div class="reference-icon">${icon('check')}</div><div><span>TESTE REAL REGISTRADO PELA EQUIPE</span><h2>O que aconteceu no teste com a API local</h2><p>Com 10 unidades e duas saídas de 7, uma resposta foi <b>HTTP 201</b>, a outra <b>HTTP 409</b>, e o saldo final foi <b>3 unidades</b>. A sequência dos clientes pode variar.</p></div><a href="https://github.com/caiopedrosapy/Gestao_estoqueSeguro_fund.comp/blob/main/backend/demonstracao-concorrencia.mjs" target="_blank" rel="noopener noreferrer">Ver código do teste ${icon('arrow-up-right')}</a></section>
    <p class="sim-footer">O resultado acima foi registrado anteriormente pela equipe; esta interface não executa um novo teste. No backend, a coordenação usa transação e bloqueio por produto.</p>`;
}
function requestCard(label, index) {
  const done = sim.step >= (index === 1 ? 2 : 4);
  const rejected = done && index === 2 && sim.mode === 'protected';
  let status = '<span>Aguardando execução</span>';
  if (sim.running && !done) status = `<span><i class="spinner"></i>${index === 2 && sim.mode === 'protected' && sim.step > 0 ? 'Aguardando liberação...' : 'Pedido em andamento...'}</span>`;
  if (done) status = `<span class="${rejected ? 'error' : 'success'}">${icon(rejected ? 'warning' : 'check')}${rejected ? '409 · Saída recusada' : '201 · Saída aceita'} <small>simulado</small></span>`;
  return `<div class="request-card ${done ? (rejected ? 'rejected' : 'approved') : ''}"><div class="request-header"><span>CLIENTE ${label}</span>${icon('arrows')}</div><h3>Saída de 7 unidades</h3><p>Mesmo produto · saldo inicial 10</p><div class="request-status">${status}</div></div>`;
}
function timelineSteps(){return sim.mode==='protected'?[['Cliente A obtém o bloqueio','O produto fica reservado para a transação A.'],['A registra a saída de 7','Saldo passa de 10 para 3; bloqueio liberado.'],['Cliente B lê o saldo atualizado','A operação B encontra apenas 3 unidades.'],['B é recusado por saldo insuficiente','Uma saída aceita, saldo final 3.']]:[['A e B leem o mesmo saldo','Os dois pedidos encontram 10 unidades.'],['A registra a saída e grava 3','O primeiro pedido calcula 10 − 7.'],['B usa a leitura antiga e grava 3','O segundo pedido repete o cálculo 10 − 7.'],['O histórico fica inconsistente','14 unidades de saída a partir de apenas 10.']];}
function render(){document.getElementById('breadcrumb-current').textContent=pageNames[page];document.title='Estoque Seguro · '+pageNames[page];document.querySelectorAll('nav a').forEach(a=>{a.classList.toggle('active',a.dataset.page===page);if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.getElementById('product-count').textContent=state.products.length;document.getElementById('alert-count').textContent=activeAlerts().length;document.getElementById('notification-dot').hidden=activeAlerts().length===0;main.innerHTML=({dashboard,products:productsPage,movements:movementsPage,locations:locationsPage,alerts:alertsPage,simulation:simulationPage}[page])();main.classList.remove('page-enter');void main.offsetWidth;main.classList.add('page-enter');hydrate();}
function route(){const target=location.hash.slice(1);page=pageNames[target]?target:'dashboard';if(page!=='simulation')document.body.classList.remove('presentation-mode');document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebar-overlay').classList.remove('open');render();window.scrollTo({top:0});}
window.addEventListener('hashchange',route);
function openModal(title,subtitle,body,footer=''){document.getElementById('modal-content').innerHTML=`<div class="modal-header"><div><h2>${title}</h2><p>${subtitle}</p></div><button class="icon-button" data-action="close-modal" aria-label="Fechar janela">${icon('close')}</button></div>${body}${footer}`;modal.showModal();}
const field=(label,content,full=false)=>`<label class="field${full?' full':''}"><span>${label}</span>${content}</label>`;
function formFooter(text){return `<div class="modal-footer"><button type="button" class="btn" data-action="close-modal">Cancelar</button><button type="submit" class="btn primary">${icon('check')}${text}</button></div>`;}
function productModal(id) {
  if (!state.locations.length) { toast('Cadastre um local antes de cadastrar um produto.', true); return; }
  const p = productById(id);
  const editing = !!p;
  const hasHistory = !!p && state.movements.some(m => m.productId === p.id);
  const options = state.locations.map(l => `<option value="${esc(l.id)}" ${p?.locationId === l.id ? 'selected' : ''}>${esc(l.name)}</option>`).join('');
  const locationControl = `<select name="locationId" required ${hasHistory ? 'disabled' : ''}>${options}</select>${hasHistory ? `<input type="hidden" name="locationId" value="${esc(p.locationId)}"><small class="field-help">Produtos com movimentações não podem trocar de local.</small>` : ''}`;
  openModal(editing ? 'Editar produto' : 'Adicionar produto', editing ? 'Use movimentações para alterar o saldo.' : 'O novo produto começa com saldo zero.',
    `<form id="product-form" data-id="${esc(id || '')}"><div class="modal-body"><div class="form-grid">
      ${field('Nome do produto', `<input name="name" required maxlength="120" placeholder="Ex.: Arroz branco · 5 kg" value="${esc(p?.name || '')}">`, true)}
      ${field('Categoria', `<input name="category" required maxlength="80" list="categories" placeholder="Ex.: Alimentos" value="${esc(p?.category || '')}"><datalist id="categories">${Object.keys(palette).map(c => `<option value="${esc(c)}"></option>`).join('')}</datalist>`, true)}
      ${field('Local de armazenamento', locationControl, true)}
      <div class="balance-preview field full">${editing ? `Saldo atual: <b>${num(p.qty)} unidades</b>. Registre uma entrada ou saída para alterá-lo.` : '<b>Saldo inicial: 0 unidades.</b> Depois do cadastro, registre uma entrada para adicionar produtos ao estoque.'}</div>
      <label class="checkbox-field"><input name="priority" type="checkbox" ${p?.priority ? 'checked' : ''}>Produto prioritário em caso de alagamento</label>
    </div><p class="form-error" id="form-error" role="alert"></p></div>${formFooter(editing ? 'Salvar alterações' : 'Cadastrar produto')}</form>`);
}
function movementModal() {
  if (!state.products.length) { toast('Cadastre um produto antes de registrar uma movimentação.', true); return; }
  openModal('Nova movimentação', 'Registre uma entrada ou saída de mercadorias.',
    `<form id="movement-form"><div class="modal-body"><div class="form-grid"><div class="field full"><span>Tipo da movimentação</span><div class="movement-type"><label class="movement-option"><input type="radio" name="type" value="ENTRADA" checked>${icon('in')}Entrada</label><label class="movement-option"><input type="radio" name="type" value="SAIDA">${icon('out')}Saída</label></div></div>
    ${field('Produto', `<select name="productId" id="movement-product" required>${state.products.map(p => `<option value="${esc(p.id)}">${esc(p.name)} · ${esc(locationName(p.locationId))}</option>`).join('')}</select>`, true)}
    ${field('Quantidade', '<input name="qty" id="movement-qty" type="number" min="1" max="2147483647" step="1" required value="1">', true)}
    <div class="balance-preview field full" id="balance-preview"></div></div><p class="form-error" id="form-error" role="alert"></p></div>${formFooter('Confirmar movimentação')}</form>`);
  updateBalancePreview();
}
function updateBalancePreview(){const form=document.getElementById('movement-form');if(!form)return;const data=new FormData(form),p=productById(data.get('productId'));if(!p)return;const q=Number(data.get('qty'))||0;const next=p.qty+(data.get('type')==='ENTRADA'?q:-q);document.getElementById('balance-preview').innerHTML=`Saldo atual: <b>${num(p.qty)} un.</b> &nbsp; → &nbsp; Após a operação: <b>${num(next)} un.</b>${next<0?'<br><span style="color:#b56b54">Saldo insuficiente. Esta saída será recusada.</span>':''}`;}
function locationModal(id) {
  const l = state.locations.find(x => x.id === id);
  openModal(l ? 'Editar local' : 'Adicionar local', 'Cadastre a localização e a condição de proteção do estoque.',
    `<form id="location-form" data-id="${esc(id || '')}"><div class="modal-body"><div class="form-grid">
      ${field('Nome do local', `<input name="name" required maxlength="120" value="${esc(l?.name || '')}" placeholder="Ex.: Depósito Norte">`, true)}
      ${field('Localização', `<input name="address" required maxlength="200" value="${esc(l?.address || '')}" placeholder="Rua, bairro ou referência">`, true)}
      ${field('Altura do estoque (cm)', `<input name="heightCm" type="number" min="0" max="2147483647" step="1" required value="${Number.isInteger(l?.heightCm) ? l.heightCm : ''}" placeholder="Ex.: 80"><small class="field-help">Altura cadastrada para o local de armazenamento.</small>`, true)}
      ${field('Condição do local', `<select name="risk"><option value="Baixo" ${l?.risk === 'Baixo' ? 'selected' : ''}>Protegido</option><option value="Alto" ${l?.risk === 'Alto' ? 'selected' : ''}>Vulnerável</option></select>`, true)}
    </div><p class="form-error" id="form-error" role="alert"></p></div>${formFooter('Salvar local')}</form>`);
}
function alertModal(){if(!state.locations.length){toast('Cadastre um local antes de cadastrar um alerta.',true);return;}openModal('Cadastrar alerta','Alerta manual associado a um local de armazenamento.',`<form id="alert-form"><div class="modal-body"><div class="form-grid">${field('Título',`<input name="title" required maxlength="100" placeholder="Ex.: Risco de alagamento">`,true)}${field('Local',`<select name="locationId" required>${state.locations.map(l=>`<option value="${esc(l.id)}">${esc(l.name)}</option>`).join('')}</select>`)}${field('Nível',`<select name="level"><option value="Alto">Alto</option><option value="Medio">Médio</option><option value="Baixo">Baixo</option></select>`)}${field('Descrição e cuidados',`<textarea name="description" required maxlength="500" placeholder="Descreva a situação e os cuidados recomendados."></textarea>`,true)}<p class="field-help full">Produtos com saldo positivo aparecem em risco quando há alerta alto ativo em um local com alta vulnerabilidade.</p></div><p class="form-error" id="form-error" role="alert"></p></div>${formFooter('Cadastrar alerta')}</form>`);}
function help(){openModal('Conheça o Estoque Seguro','Protótipo integrado para a disciplina.',`<div class="modal-body modal-copy"><p>Produtos, locais, movimentações e alertas são consultados e gravados pela <b>API de estoque no PostgreSQL</b>.</p><p>A consulta à APAC utiliza um serviço climático separado e depende da disponibilidade externa. Os alertas continuam manuais.</p><p>A animação de concorrência é <b>ilustrativa</b>; o teste real pode ser executado separadamente na API.</p></div><div class="modal-footer"><button class="btn primary" data-action="close-modal">Entendi</button></div>`);}
function deleteProduct(id) {
  const product = productById(id);
  if (!product) return;
  if (product.qty !== 0 || state.movements.some(m => m.productId === product.id)) {
    const reason = product.qty !== 0 ? 'O produto ainda possui saldo. Para removê-lo, o saldo precisa ser zero.' : 'O produto possui movimentações no histórico e não pode ser removido.';
    openModal('Não é possível remover', esc(product.name), `<div class="modal-body modal-copy"><p>${reason}</p><p>Essa regra preserva a consistência do estoque e do histórico de movimentações.</p></div><div class="modal-footer"><button class="btn primary" data-action="close-modal">Entendi</button></div>`);
    return;
  }
  openModal('Remover produto?', esc(product.name), `<div class="modal-body modal-copy"><p>O produto sem saldo e sem movimentações será removido do estoque.</p></div><div class="modal-footer"><button class="btn" data-action="close-modal">Cancelar</button><button class="btn danger" data-action="confirm-delete" data-id="${esc(id)}">${icon('trash')}Remover produto</button></div>`);
}
function resetSimulation(){simTimers.forEach(clearTimeout);simTimers=[];sim={...sim,running:false,step:0,done:false};if(page==='simulation')render();}
function runSimulation(){if(sim.running)return;resetSimulation();sim.running=true;render();[1,2,3,4].forEach((step,i)=>simTimers.push(setTimeout(()=>{sim.step=step;if(step===4){sim.running=false;sim.done=true;}if(page==='simulation')render();},(i+1)*850)));}
function exportCSV() {
  const rows = [['Produto', 'Categoria', 'Quantidade', 'Local', 'Prioritário'], ...filteredProducts().map(p => [p.name, p.category, p.qty, locationName(p.locationId), p.priority ? 'Sim' : 'Não'])];
  const csv = '\uFEFF' + rows.map(row => row.map(value => {
    let text = String(value);
    if (/^[\s]*[=+\-@\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g, '""') + '"';
  }).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'estoque-seguro-produtos.csv'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000); toast('Arquivo CSV exportado.');
}
document.addEventListener('click', async event => {
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action, id = button.dataset.id;
  try {
    switch (action) {
      case 'menu': document.getElementById('sidebar').classList.toggle('open'); document.getElementById('sidebar-overlay').classList.toggle('open'); break;
      case 'help': help(); break;
      case 'close-modal': modal.close(); break;
      case 'add-product': if(requireApi()) productModal(); break;
      case 'edit-product': if(requireApi()) productModal(id); break;
      case 'delete-product': if(requireApi()) deleteProduct(id); break;
      case 'confirm-delete':
        if (!requireApi()) break;
        button.disabled = true;
        await api(`/produtos/${encodeURIComponent(id)}`, {method:'DELETE'});
        modal.close(); await refreshData(); toast('Produto removido do estoque.'); break;
      case 'add-movement': if(requireApi()) movementModal(); break;
      case 'add-location': if(requireApi()) locationModal(); break;
      case 'edit-location': if(requireApi()) locationModal(id); break;
      case 'add-alert': if(requireApi()) alertModal(); break;
      case 'view-products': search=''; locationFilter=''; statusFilter=''; navigate('products'); break;
      case 'view-risk': search=''; locationFilter=''; statusFilter='risk'; navigate('products'); break;
      case 'location-products': search=''; locationFilter=id; statusFilter=''; navigate('products'); break;
      case 'view-alerts': case 'notifications': navigate('alerts'); break;
      case 'view-locations': navigate('locations'); break;
      case 'view-simulation': navigate('simulation'); break;
      case 'clear-filters': search=''; locationFilter=''; statusFilter=''; render(); break;
      case 'movement-filter': movementFilter=id; render(); break;
      case 'alert-filter': alertFilter=id; render(); break;
      case 'resolve-alert': case 'reopen-alert':
        if (!requireApi()) break;
        button.disabled = true;
        await api(`/alertas/${encodeURIComponent(id)}`, {method:'PATCH', body:JSON.stringify({ativo:action==='reopen-alert'})});
        await refreshData(); toast(action==='reopen-alert' ? 'Alerta reativado.' : 'Alerta marcado como resolvido.'); break;
      case 'check-climate': await consultClimate(); break;
      case 'refresh-data': await refreshData(); break;
      case 'reset-simulation': resetSimulation(); break;
      case 'sim-mode': if(!sim.running){resetSimulation(); sim.mode=id; render();} break;
      case 'run-simulation': runSimulation(); break;
      case 'toggle-presentation': document.body.classList.toggle('presentation-mode'); render(); break;
      case 'export': exportCSV(); break;
    }
  } catch (error) {
    button.disabled = false;
    toast(error.message || 'Não foi possível concluir a operação.', true);
    if (apiReady) await refreshData();
  }
});
document.getElementById('sidebar-overlay').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebar-overlay').classList.remove('open');});
document.addEventListener('input',event=>{if(event.target.id==='product-search'){search=event.target.value;updateProductResults();}if(event.target.closest('#movement-form'))updateBalancePreview();});
document.addEventListener('change',event=>{if(event.target.id==='location-filter'){locationFilter=event.target.value;updateProductResults();}if(event.target.id==='status-filter'){statusFilter=event.target.value;updateProductResults();}if(event.target.closest('#movement-form'))updateBalancePreview();});
document.addEventListener('submit', async event => {
  const form = event.target;
  if (!['product-form', 'movement-form', 'location-form', 'alert-form'].includes(form.id)) return;
  event.preventDefault();
  if (!requireApi()) return;
  const data = Object.fromEntries(new FormData(form));
  const error = document.getElementById('form-error');
  const submit = form.querySelector('button[type="submit"]');
  const fail = text => { error.textContent = text; };
  const maxQuantity = 2147483647;
  let path, payload, method = 'POST', message;

  if (form.id === 'product-form') {
    const name = data.name.trim(), category = data.category.trim();
    if (!name || !category || name.length > 120 || category.length > 80) return fail('Informe nome e categoria válidos.');
    if (!state.locations.some(l => l.id === data.locationId)) return fail('Selecione um local de armazenamento válido.');
    const existing = productById(form.dataset.id);
    if (existing && existing.locationId !== data.locationId && state.movements.some(m => m.productId === existing.id)) return fail('Produto com movimentação não pode trocar de local.');
    payload = {nome:name, categoria:category, estoqueId:Number(data.locationId), prioritario:data.priority === 'on'};
    path = '/produtos' + (existing ? `/${encodeURIComponent(existing.id)}` : '');
    method = existing ? 'PATCH' : 'POST';
    message = existing ? 'Produto atualizado.' : 'Produto cadastrado com saldo zero.';
  } else if (form.id === 'movement-form') {
    const quantity = Number(data.qty);
    if (!productById(data.productId) || !['ENTRADA','SAIDA'].includes(data.type) || !Number.isSafeInteger(quantity) || quantity <= 0 || quantity > maxQuantity) return fail('Escolha um produto e informe uma quantidade inteira positiva.');
    payload = {produtoId:Number(data.productId), tipo:data.type, quantidade:quantity};
    path = '/movimentacoes'; message = 'Movimentação registrada.';
  } else if (form.id === 'location-form') {
    const name=data.name.trim(), address=data.address.trim(), heightCm=Number(data.heightCm);
    if (!name || !address) return fail('Informe o nome e a localização.');
    if (!Number.isSafeInteger(heightCm) || heightCm < 0 || heightCm > maxQuantity) return fail('Informe uma altura válida em centímetros.');
    const existing = state.locations.find(l => l.id === form.dataset.id);
    payload = {nome:name, localizacao:address, alturaCm:heightCm, seguro:data.risk === 'Baixo'};
    path = '/estoques' + (existing ? `/${encodeURIComponent(existing.id)}` : '');
    method = existing ? 'PATCH' : 'POST'; message = 'Local salvo.';
  } else {
    if (!data.title.trim() || !data.description.trim()) return fail('Informe o título e a descrição do alerta.');
    if (!state.locations.some(l => l.id === data.locationId)) return fail('Selecione um local de armazenamento válido.');
    payload = {titulo:data.title.trim(), descricao:data.description.trim(), estoqueId:Number(data.locationId), nivel:levelToApi(data.level)};
    path = '/alertas'; message = 'Alerta cadastrado.';
  }
  submit.disabled = true; error.textContent = '';
  try {
    await api(path, {method, body:JSON.stringify(payload)});
    modal.close();
    await refreshData();
    toast(message);
  } catch (e) {
    fail(e.message || 'Não foi possível salvar.');
    // O saldo ou outra informação pode ter mudado em outro navegador.
    if (form.id === 'movement-form' && apiReady) await refreshData();
  } finally { submit.disabled = false; }
});
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
connectionStatus(false);
route();
refreshData();
