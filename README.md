# 🗳️ MOZVOTE SUPREMO — Guia de Instalação

## 📁 Estrutura de Ficheiros

```
mozvote/
├── index.html        → Página inicial
├── registro.html     → Criar conta
├── login.html        → Login eleitor
├── votar.html        → Tela de votação estilo urna
├── confirmar.html    → Confirmação do voto
├── sucesso.html      → Voto confirmado (+ confetti!)
├── resultado.html    → Resultados com gráficos
├── admin.html        → Painel administrador
└── js/
    └── config.js     → Funções compartilhadas (Supabase)
```

---

## 🚀 Como Configurar (3 passos)

### Passo 1 — Criar conta no Supabase
1. Aceda a https://supabase.com e crie conta gratuita
2. Crie um novo projeto (guarde a senha do projeto)
3. Aguarde a instalação (~2 minutos)

### Passo 2 — Criar as tabelas
1. No painel do Supabase, clique em **SQL Editor**
2. Aceda ao `admin.html` do seu site
3. Faça login (admin / 123456)
4. Vá a **Supabase** no menu lateral
5. Copie o SQL mostrado e cole no Supabase SQL Editor
6. Clique em **Run** para executar

### Passo 3 — Configurar credenciais
1. No Supabase, vá a **Project Settings → API**
2. Copie a **Project URL** e a **anon/public key**
3. No admin.html → Supabase, cole as credenciais
4. Clique **SALVAR E TESTAR**

---

## 🌐 Como Hospedar

### Opção 1 — Netlify (Grátis)
1. Aceda a https://netlify.com
2. Arraste a pasta `mozvote/` para o site
3. O site fica online automaticamente!

### Opção 2 — GitHub Pages (Grátis)
1. Crie repositório no GitHub
2. Faça upload dos ficheiros
3. Ative GitHub Pages nas configurações

### Opção 3 — Servidor próprio
- Copie todos os ficheiros para a pasta do servidor
- Funciona com qualquer servidor web (Apache, Nginx)

---

## 👤 Contas de Teste

| Tipo | Utilizador | Senha |
|------|-----------|-------|
| Admin | admin | 123456 |
| Eleitor | Qualquer BI | Sua senha |

---

## 🔧 Funcionalidades

### ✅ Sistema de Votação
- Registo com BI único
- Login seguro
- Votação estilo urna electrónica brasileira
- Confirmação antes de gravar
- Apenas 1 voto por BI

### ✅ Resultados
- Gráficos de pizza e barras (Chart.js)
- Percentagens em tempo real
- Destaque do vencedor
- Auto-atualização a cada 30 segundos

### ✅ Painel Admin (admin / 123456)
- Dashboard com estatísticas
- Gestão de partidos (adicionar/remover/activar)
- Lista de eleitores
- Resultados detalhados
- Controlo da eleição (activar/desactivar)
- Reset de votos
- Exportar CSV
- Configuração do Supabase

### ✅ UX/Design
- Animações e confetti no sucesso
- Sons ao votar
- Design responsivo (mobile/tablet/desktop)
- Cores de Moçambique 🇲🇿

---

## 🔒 Segurança
- Senha hash simples (para produção avançada, use Supabase Edge Functions com bcrypt)
- Verificação dupla de voto único
- Sessão por localStorage
- Verificação de sessão em cada página protegida

---

## ⚠️ Nota sobre Senhas
O sistema usa um hash simples para demonstração. Para eleições reais, é recomendado:
1. Usar Supabase Auth nativo
2. Ou implementar Edge Functions com bcrypt

---

© 2025 MOZVOTE SUPREMO 🇲🇿
