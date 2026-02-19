// ============================================================
// MOZVOTE SUPREMO — Configuração Supabase
// Coloque este ficheiro em js/config.js OU inclua inline
// ============================================================

// INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Crie uma conta em https://supabase.com
// 2. Crie um novo projeto
// 3. Execute o SQL abaixo na aba "SQL Editor"
// 4. Copie a URL e a Anon Key do projeto
// 5. Cole aqui OU configure via Painel Admin

/*
SQL PARA EXECUTAR NO SUPABASE:

-- Tabela de eleitores
CREATE TABLE IF NOT EXISTS eleitores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  bi TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  votou BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de partidos
CREATE TABLE IF NOT EXISTS partidos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero INTEGER UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  candidato TEXT NOT NULL,
  logo_url TEXT,
  candidato_foto_url TEXT,
  cor TEXT DEFAULT '#009A44',
  ativo BOOLEAN DEFAULT TRUE,
  criado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de votos
CREATE TABLE IF NOT EXISTS votos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  eleitor_id UUID REFERENCES eleitores(id),
  partido_id UUID REFERENCES partidos(id),
  votado_em TIMESTAMP DEFAULT NOW()
);

-- Tabela de configurações
CREATE TABLE IF NOT EXISTS configuracoes (
  id INTEGER PRIMARY KEY DEFAULT 1,
  eleicao_ativa BOOLEAN DEFAULT TRUE,
  titulo_eleicao TEXT DEFAULT 'Eleições Gerais 2025',
  descricao TEXT DEFAULT 'Escolha o seu partido'
);

-- Inserir configuração inicial
INSERT INTO configuracoes (id, eleicao_ativa, titulo_eleicao) 
VALUES (1, true, 'Eleições Gerais 2025')
ON CONFLICT (id) DO NOTHING;

-- Inserir partidos padrão
INSERT INTO partidos (numero, nome, candidato, logo_url, cor) VALUES
(1, 'FRELIMO', 'Daniel Chapo', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Frelimo_Logo.png/200px-Frelimo_Logo.png', '#CC0000'),
(2, 'RENAMO', 'Ossufo Momade', 'https://via.placeholder.com/100/FFD700/000000?text=RENAMO', '#FFD700'),
(3, 'MDM', 'Lutero Simango', 'https://via.placeholder.com/100/0000CC/FFFFFF?text=MDM', '#0000CC'),
(4, 'PODEMOS', 'Venâncio Mondlane', 'https://via.placeholder.com/100/FF6600/FFFFFF?text=PODEMOS', '#FF6600')
ON CONFLICT (numero) DO NOTHING;

-- Desabilitar RLS para desenvolvimento (ATENÇÃO: para produção, configure RLS apropriadamente)
ALTER TABLE eleitores DISABLE ROW LEVEL SECURITY;
ALTER TABLE partidos DISABLE ROW LEVEL SECURITY;
ALTER TABLE votos DISABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes DISABLE ROW LEVEL SECURITY;
*/

// Funções utilitárias compartilhadas
function getSBConfig() {
  return {
    url: localStorage.getItem('sb_url') || '',
    key: localStorage.getItem('sb_key') || ''
  };
}

function sbHeaders(key) {
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
}

async function sbGet(table, params = '') {
  const { url, key } = getSBConfig();
  if (!url || !key) throw new Error('Supabase não configurado');
  const res = await fetch(`${url}/rest/v1/${table}${params}`, { headers: sbHeaders(key) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbPost(table, data) {
  const { url, key } = getSBConfig();
  if (!url || !key) throw new Error('Supabase não configurado');
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: sbHeaders(key),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbPatch(table, params, data) {
  const { url, key } = getSBConfig();
  if (!url || !key) throw new Error('Supabase não configurado');
  const res = await fetch(`${url}/rest/v1/${table}${params}`, {
    method: 'PATCH',
    headers: sbHeaders(key),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function sbDelete(table, params) {
  const { url, key } = getSBConfig();
  if (!url || !key) throw new Error('Supabase não configurado');
  const res = await fetch(`${url}/rest/v1/${table}${params}`, {
    method: 'DELETE',
    headers: sbHeaders(key)
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

function hashSenha(senha) {
  // Simple hash for demo - in production use bcrypt via Edge Functions
  let hash = 0;
  for (let i = 0; i < senha.length; i++) {
    const char = senha.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'mzv_' + Math.abs(hash).toString(36) + '_' + senha.length;
}

function checkSession() {
  const user = localStorage.getItem('mozvote_user');
  if (!user) { window.location.href = 'login.html'; return null; }
  return JSON.parse(user);
}

function logout() {
  localStorage.removeItem('mozvote_user');
  window.location.href = 'index.html';
}

function showToast(msg, type = 'info') {
  const colors = { success: '#009A44', error: '#C8102E', info: '#B8860B', warning: '#FFD700' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${colors[type]}; color: white; padding: 15px 25px;
    border-radius: 8px; font-family: 'Oswald', sans-serif;
    font-size: 0.95rem; letter-spacing: 1px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
