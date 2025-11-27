# 🚀 Next Talent

**Plataforma centralizada para divulgar programas de formação em tecnologia.**

O **Next Talent** resolve o problema da **divulgação descentralizada** de iniciativas como bootcamps, residências e programas educacionais voltados à tecnologia. Conecta talentos em busca de oportunidades com empresas e instituições que oferecem programas de formação, de forma prática e centralizada.

---

## 📌 Índice

- [🎯 Objetivo](#objetivo)
- [🧩 Funcionalidades](#funcionalidades)
- [🛠 Tecnologias utilizadas](#tecnologias-utilizadas)
- [📦 Como instalar e rodar o projeto](#como-instalar-e-rodar-o-projeto)
- [🚀 Como usar](#como-usar)
- [🤝 Contribuindo](#contribuindo)
- [📝 Licença](#licença)
- [👥 Autores e colaboradores](#autores-e-colaboradores)
- [🙏 Agradecimentos](#agradecimentos)

---
🎯
## Objetivo

Facilitar o acesso de talentos a oportunidades de formação em tecnologia, notificando sobre editais e inscrições abertas conforme interesses do usuário, e centralizando as informações em uma única plataforma.

---
🧩
## Funcionalidades

- 🏢 **Cadastro de Programas:** Empresas e instituições podem registrar novas iniciativas, informando regras, público-alvo, datas e anexando o edital.
- 👥 **Navegação por Oportunidades:** Usuários visualizam e acompanham facilmente os programas em andamento.
- 🔔 **Alertas Inteligentes:** Usuários podem receber notificações sobre novas oportunidades alinhadas com seus interesses.

---
🛠
## Tecnologias Utilizadas

### Frontend
- [**Next.js**](https://nextjs.org/) – Framework React para desenvolvimento web moderno.
- [**Chakra UI**](https://chakra-ui.com/) – Biblioteca de componentes acessíveis e estilizados.
- [**Zustand**](https://zustand-demo.pmnd.rs/) – Gerenciador de estado simples e poderoso para React.
- [**Firebase Auth**](https://firebase.google.com/docs/auth) – Autenticação com Google.

### Backend
- [**NestJS**](https://nestjs.com/) – Framework Node.js progressivo para construção de aplicações server-side.
- [**PostgreSQL**](https://www.postgresql.org/) – Banco de dados relacional.
- [**Sequelize**](https://sequelize.org/) – ORM para Node.js.
- [**Firebase Admin SDK**](https://firebase.google.com/docs/admin/setup) – Autenticação e autorização.
- [**Swagger**](https://swagger.io/) – Documentação da API.

---
📦
## Como instalar e rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js (v16+ recomendado)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/next-talent.git
cd next-talent

# Instale as dependências do frontend
cd frontend
npm install
# ou
yarn install

# Instale as dependências do backend
cd ../backend
npm install
# ou
yarn install
```

### Configuração de Variáveis de Ambiente

#### Frontend

Crie um arquivo `.env.local` na pasta `frontend/` com as seguintes variáveis:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

#### Backend

Crie um arquivo `.env` na pasta `backend/` com as configurações do banco de dados e Firebase Admin SDK.

### Rodando o projeto

**Importante:** Você precisa rodar o backend e o frontend simultaneamente.

#### Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
# ou
yarn start:dev
```

O backend estará disponível em `http://localhost:3001` e a documentação Swagger em `http://localhost:3001/api/docs`.

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# ou
yarn dev
```

O frontend estará disponível em `http://localhost:3000`.

---

## 🐳 Executando com Docker

Para executar o projeto usando Docker, consulte o guia completo em [DOCKER.md](./DOCKER.md).

**Início rápido:**
```bash
# Construir e iniciar todos os serviços
docker-compose up -d

# Executar migrações
docker-compose exec backend npm run migration:run

# Ver logs
docker-compose logs -f
```

Os serviços estarão disponíveis em:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

---

## 🧪 Como Testar a Integração

Para verificar se a integração frontend-backend está funcionando, consulte o guia completo em [TESTE_INTEGRACAO.md](./TESTE_INTEGRACAO.md).

**Teste rápido:**
1. Certifique-se de que backend e frontend estão rodando
2. Acesse `http://localhost:3000/dashboard`
3. Faça login com Google
4. Verifique se os programas aparecem (devem vir do backend)
5. Clique no ícone de coração para favoritar um programa
6. Abra o DevTools (F12) e verifique a aba Network para ver as requisições ao backend

---
🚀
## Como usar

Após iniciar o projeto localmente:

### 🏢 Empresas/Instituições

1. Acesse `/admin` ou a rota de administração.
2. Preencha o formulário com as informações do programa (nome, descrição, público, datas).
3. Faça upload do edital em PDF.
4. Publique o programa.

### 👤 Usuários

1. Acesse a página inicial.
2. Navegue pelas oportunidades ativas.
3. Filtre por área de interesse, região ou modalidade.
4. Salve oportunidades favoritas ou inscreva-se conforme instruções do edital.

---
🤝
## Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. **Fork** este repositório.
2. Crie uma branch para sua feature/correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Suba para seu fork:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request** com uma descrição clara do que foi feito.

Você também pode abrir **Issues** para reportar bugs ou sugerir melhorias!

---
📝
## Licença

Este projeto está licenciado sob a licença **MIT**.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
👥
## Autores e Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/arllekws">
        <img src="https://avatars.githubusercontent.com/arllekws" width="80px;" alt="Foto Nome1"/>
        <br /><sub><b>Arllesson Gomes/b></sub>
      </a>
      <br />Frontend
    </td>
    <td align="center">
      <a href="https://github.com/PriscilaMdeLima">
        <img src="https://avatars.githubusercontent.com/PriscilaMdeLima" width="80px;" alt="Foto Nome2"/>
        <br /><sub><b>Priscila</b></sub>
      </a>
      <br />Full Stack
    </td>
    <td align="center">
      <a href="https://github.com/Joao-Miguel-F">
        <img src="https://avatars.githubusercontent.com/Joao-Miguel-F" width="80px;" alt="Foto Nome3"/>
        <br /><sub><b>João Miguel</b></sub>
      </a>
      <br />Full Stack
    </td>
    <td align="center">
      <a href="https://github.com/tfsLua">
        <img src="https://avatars.githubusercontent.com/tfsLua" width="80px;" alt="Foto Nome4"/>
        <br /><sub><b>Thaissa Fernandes (Lua)</b></sub>
      </a>
      <br />Full Stack
    </td>
    <td align="center">
      <a href="https://github.com/Isaac-Daniel-A-D">
        <img src="https://avatars.githubusercontent.com/Isaac-Daniel-A-D" width="80px;" alt="Foto Nome4"/>
        <br /><sub><b>Isaac Daniel</b></sub>
      </a>
      <br />Full Stack
    </td>
  </tr>
</table>

---


## ✅ Checklist de Entrega

Este checklist descreve os itens implementados e testados no projeto **NextTalent**:

- [ X ] **Next + Chakra + Zustand configurados**  
- [ X ] **`/programas`**: Lista de programas com filtros funcionando (área, modalidade, nível, período de inscrição)  
- [ X ] **`/programas/[id]`**: Página de detalhes com dados simulados  
- [ X ] **Favoritar / Desfavoritar**: Funcionalidade funcionando e integrada com o backend  
- [ ] **`/instituicoes`**: Cards básicos de instituições  
- [ X ] **`/favoritos`**: Exibição das oportunidades favoritas do usuário  
- [ X] **`/perfil`**: Página de perfil com interesses simulados  
- [ ] **Loading / Empty / Error states**: Estados de carregamento, vazio e erro implementados  
- [ X ] **Deploy publicado**: Projeto disponível online com link no README  
- [ X ] **README**: Instruções de instalação, execução e uso atualizadas
- [ X ] **Integração Frontend-Backend**: Frontend totalmente integrado com a API do backend


## Agradecimentos
🙏
- A todos os programas de formação que inspiraram esta iniciativa.
- À comunidade open-source que torna projetos como este possíveis.
- Aos feedbacks construtivos durante o desenvolvimento acadêmico e profissional.

---

> Desenvolvido com ❤️ por pessoas que acreditam na democratização da tecnologia.