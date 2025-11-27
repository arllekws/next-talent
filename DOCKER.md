# 🐳 Guia Docker - NextTalent

Este guia explica como executar o projeto NextTalent usando Docker.

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## 🚀 Início Rápido

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Firebase Admin SDK (Backend)
FIREBASE_PROJECT_ID=seu-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@...iam.gserviceaccount.com

# Firebase Client (Frontend)
NEXT_PUBLIC_FIREBASE_API_KEY=sua-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

### 2. Construir e Iniciar os Containers

```bash
# Construir e iniciar todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### 3. Executar Migrações e Seeders

```bash
# Executar migrações
docker-compose exec backend npm run migration:run

# Executar seeders (opcional)
docker-compose exec backend npm run seed:run
```

### 4. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs
- **PostgreSQL**: localhost:5432

## 🛠️ Comandos Úteis

### Parar os containers
```bash
docker-compose down
```

### Parar e remover volumes (limpar dados do banco)
```bash
docker-compose down -v
```

### Reconstruir as imagens
```bash
docker-compose build --no-cache
```

### Reiniciar um serviço específico
```bash
docker-compose restart backend
docker-compose restart frontend
```

### Executar comandos dentro de um container
```bash
# Backend
docker-compose exec backend npm run migration:run
docker-compose exec backend npm run seed:run

# Frontend
docker-compose exec frontend npm run build

# PostgreSQL
docker-compose exec postgres psql -U postgres -d nexttalent
```

### Ver status dos containers
```bash
docker-compose ps
```

## 📁 Estrutura dos Arquivos Docker

```
next-talent/
├── docker-compose.yml          # Orquestração dos serviços
├── backend/
│   ├── Dockerfile              # Imagem do backend
│   └── .dockerignore           # Arquivos ignorados no build
└── frontend/
    ├── Dockerfile              # Imagem do frontend
    └── .dockerignore           # Arquivos ignorados no build
```

## 🔧 Configurações Avançadas

### Modificar Portas

Se precisar alterar as portas, edite o arquivo `docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "3001:3001"  # Altere a primeira porta (host:container)
  
  frontend:
    ports:
      - "3000:3000"  # Altere a primeira porta (host:container)
  
  postgres:
    ports:
      - "5432:5432"  # Altere a primeira porta (host:container)
```

### Modo Desenvolvimento

Para desenvolvimento com hot-reload, você pode usar volumes:

```yaml
services:
  backend:
    volumes:
      - ./backend:/app
      - /app/node_modules
    command: npm run start:dev

  frontend:
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
```

### Persistência de Dados

Os dados do PostgreSQL são persistidos em um volume Docker chamado `postgres_data`. Para fazer backup:

```bash
# Backup
docker-compose exec postgres pg_dump -U postgres nexttalent > backup.sql

# Restaurar
docker-compose exec -T postgres psql -U postgres nexttalent < backup.sql
```

## 🐛 Troubleshooting

### Erro: Porta já em uso

Se alguma porta estiver em uso, você pode:
1. Parar o serviço que está usando a porta
2. Alterar a porta no `docker-compose.yml`

### Erro: Container não inicia

```bash
# Ver logs detalhados
docker-compose logs backend
docker-compose logs frontend

# Verificar se os containers estão rodando
docker-compose ps

# Reiniciar tudo
docker-compose down
docker-compose up -d
```

### Erro: Banco de dados não conecta

```bash
# Verificar se o PostgreSQL está saudável
docker-compose exec postgres pg_isready -U postgres

# Verificar logs do banco
docker-compose logs postgres

# Verificar variáveis de ambiente do backend
docker-compose exec backend env | grep DATABASE
```

### Limpar tudo e começar do zero

```bash
# Parar e remover containers, volumes e imagens
docker-compose down -v --rmi all

# Reconstruir tudo
docker-compose build --no-cache
docker-compose up -d
```

## 📝 Notas Importantes

1. **Firebase Admin SDK**: O arquivo `firebase-adminsdk.json` precisa estar no diretório `backend/` ou configurado via variáveis de ambiente.

2. **Variáveis de Ambiente**: As variáveis do Firebase são necessárias para autenticação funcionar.

3. **Migrações**: Execute as migrações após iniciar os containers pela primeira vez.

4. **Produção**: Para produção, considere:
   - Usar variáveis de ambiente seguras
   - Configurar SSL/TLS
   - Usar um banco de dados gerenciado
   - Configurar backups automáticos

## 🚀 Deploy em Produção

Para produção, você pode:

1. **Usar Docker Compose em servidor**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

2. **Usar Kubernetes**: Criar manifests para cada serviço

3. **Usar serviços gerenciados**:
   - Frontend: Vercel, Netlify
   - Backend: Railway, Render, AWS ECS
   - Database: AWS RDS, Google Cloud SQL

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [NestJS Docker Deployment](https://docs.nestjs.com/recipes/docker)

