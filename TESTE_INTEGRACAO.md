# 🧪 Guia de Testes - Integração Frontend-Backend

Este guia te ajudará a verificar se a integração entre frontend e backend está funcionando corretamente.

## 📋 Pré-requisitos

1. ✅ Backend rodando na porta 3001
2. ✅ Frontend rodando na porta 3000
3. ✅ Variáveis de ambiente configuradas
4. ✅ Banco de dados configurado e migrado
5. ✅ Firebase configurado

---

## 🚀 Passo a Passo para Testar

### 1. Verificar se o Backend está rodando

Abra o terminal onde o backend está rodando e verifique:

```bash
# Deve aparecer algo como:
🚀 Application is running on: http://localhost:3001
📚 Swagger documentation: http://localhost:3001/api/docs
```

**Teste rápido:** Acesse no navegador:
- `http://localhost:3001/api/docs` - Deve abrir a documentação Swagger
- `http://localhost:3001/api/programs` - Deve retornar JSON com programas (ou array vazio)

### 2. Verificar se o Frontend está rodando

Abra o terminal onde o frontend está rodando e verifique:

```bash
# Deve aparecer algo como:
✓ Ready in X seconds
○ Local: http://localhost:3000
```

**Teste rápido:** Acesse no navegador:
- `http://localhost:3000` - Deve abrir a página inicial

### 3. Verificar Console do Navegador

Abra o DevTools do navegador (F12) e vá na aba **Console**. Você deve ver logs como:

```
🔄 Buscando programas do backend...
📡 URL: http://localhost:3001/api/programs
✅ Programas recebidos: [...]
```

**Se aparecer erros de CORS ou conexão:**
- Verifique se o backend está rodando
- Verifique se a URL da API está correta no `.env.local`

### 4. Testar Listagem de Programas

1. Acesse `http://localhost:3000/dashboard`
2. Faça login com Google (se necessário)
3. Verifique se os programas aparecem na lista

**O que verificar:**
- ✅ Programas são carregados do backend
- ✅ Não há erros no console
- ✅ Loading state funciona (spinner aparece enquanto carrega)

**No console do navegador, você deve ver:**
```
🏪 Store: fetchPrograms chamado
🔄 Buscando programas do backend...
📡 URL: http://localhost:3001/api/programs
✅ Programas recebidos: [...]
🏪 Store: programas recebidos: [...]
```

### 5. Testar Detalhes de um Programa

1. Clique em um programa na lista
2. Deve abrir a página de detalhes em `/programas/[id]`

**O que verificar:**
- ✅ Página carrega sem erros
- ✅ Informações do programa são exibidas corretamente

### 6. Testar Favoritar/Desfavoritar

1. Na lista de programas, clique no ícone de coração
2. Verifique no console do navegador

**O que verificar:**
- ✅ Ícone muda de coração vazio para preenchido
- ✅ No console, deve aparecer a chamada à API:
  ```
  POST http://localhost:3001/api/saved-programs/[id]
  ```
- ✅ Ao clicar novamente, deve fazer DELETE

**Teste no Network tab (F12 > Network):**
- Filtre por "saved-programs"
- Deve ver requisições POST e DELETE quando favoritar/desfavoritar

### 7. Testar Dashboard do Usuário

1. Acesse `/dashboard` (já logado)
2. Verifique se os dados são carregados

**O que verificar:**
- ✅ Estatísticas aparecem (Programas Inscritos, Salvos, etc.)
- ✅ Programas favoritos aparecem na aba "Favoritos"
- ✅ Dados vêm do backend (não são mockados)

**No console, você deve ver:**
```
🔄 Buscando dashboard do backend...
✅ Dashboard recebido: {...}
```

**No Network tab:**
- Deve ver requisições para `/api/dashboard`
- Deve ver requisições para `/api/users/me`
- Deve ver requisições para `/api/saved-programs`

### 8. Verificar Logs do Backend

No terminal do backend, você deve ver logs como:

```
[Nest] GET /api/programs 200
[Nest] GET /api/dashboard 200
[Nest] POST /api/saved-programs/123 201
```

**Se aparecer erros 401 (Unauthorized):**
- Verifique se o token do Firebase está sendo enviado
- Verifique se o Firebase Auth está configurado corretamente

---

## 🔍 Checklist de Verificação

Marque cada item conforme testa:

### Backend
- [ ] Backend está rodando na porta 3001
- [ ] Swagger está acessível em `/api/docs`
- [ ] Endpoint `/api/programs` retorna dados (ou array vazio)
- [ ] Logs aparecem no terminal quando há requisições

### Frontend
- [ ] Frontend está rodando na porta 3000
- [ ] Página inicial carrega sem erros
- [ ] Console do navegador não mostra erros de CORS
- [ ] Variável `NEXT_PUBLIC_API_URL` está configurada corretamente

### Integração
- [ ] Programas são listados do backend
- [ ] Detalhes do programa carregam corretamente
- [ ] Favoritar/desfavoritar funciona e persiste no backend
- [ ] Dashboard carrega dados do backend
- [ ] Estatísticas são calculadas pelo backend
- [ ] Programas salvos aparecem na aba "Favoritos"

### Autenticação
- [ ] Login com Google funciona
- [ ] Token do Firebase é obtido corretamente
- [ ] Requisições protegidas incluem o token no header
- [ ] Backend valida o token corretamente

---

## 🐛 Problemas Comuns e Soluções

### Erro: "Failed to fetch" ou "Network Error"

**Causa:** Backend não está rodando ou URL incorreta

**Solução:**
1. Verifique se o backend está rodando: `http://localhost:3001/api/docs`
2. Verifique a variável `NEXT_PUBLIC_API_URL` no `.env.local`
3. Verifique se não há firewall bloqueando

### Erro: CORS (Cross-Origin Resource Sharing)

**Causa:** Backend não está permitindo requisições do frontend

**Solução:**
1. Verifique o arquivo `backend/src/main.ts`
2. Certifique-se que `origin: ['http://localhost:3000']` está configurado

### Erro: 401 Unauthorized

**Causa:** Token do Firebase não está sendo enviado ou é inválido

**Solução:**
1. Verifique se está logado no frontend
2. Verifique se o token está sendo obtido: `user.getIdToken()`
3. Verifique se o Firebase Admin SDK está configurado no backend

### Programas não aparecem

**Causa:** Banco de dados vazio ou endpoint retornando erro

**Solução:**
1. Verifique se as migrações foram executadas: `npm run migration:run`
2. Verifique se os seeders foram executados: `npm run seed:run`
3. Teste o endpoint diretamente: `http://localhost:3001/api/programs`

### Dashboard mostra dados mockados

**Causa:** `dashboardService.ts` ainda está usando funções mockadas

**Solução:**
1. Verifique se o arquivo foi atualizado para usar `fetchUser`, `fetchStats`, `fetchSavedProgramsList`
2. Verifique se o token está sendo passado para `fetchDashboardData(token)`

---

## 📊 Testes Avançados

### Testar com Postman/Insomnia

1. Importe a collection do Postman (se disponível em `backend/postman_collection.json`)
2. Teste os endpoints diretamente
3. Para endpoints protegidos, obtenha o token do Firebase e use no header:
   ```
   Authorization: Bearer <seu-token-firebase>
   ```

### Verificar Respostas da API

No Network tab do navegador:
1. Filtre por "Fetch/XHR"
2. Clique em uma requisição
3. Verifique:
   - **Status:** Deve ser 200, 201, etc. (não 4xx ou 5xx)
   - **Response:** Deve conter os dados esperados
   - **Headers:** Deve incluir `Authorization: Bearer ...` para rotas protegidas

---

## ✅ Quando tudo estiver funcionando

Você deve conseguir:
1. ✅ Ver programas listados do backend
2. ✅ Favoritar/desfavoritar programas (persistindo no backend)
3. ✅ Ver estatísticas reais no dashboard
4. ✅ Ver programas salvos na aba "Favoritos"
5. ✅ Não ver erros no console do navegador
6. ✅ Ver logs de requisições no terminal do backend

---

## 🆘 Ainda com problemas?

1. Verifique os logs do backend no terminal
2. Verifique o console do navegador (F12)
3. Verifique a aba Network no DevTools
4. Verifique se todas as variáveis de ambiente estão configuradas
5. Verifique se o banco de dados está acessível e tem dados

