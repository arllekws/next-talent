
# 🌟 Next Talent

Plataforma para **centralizar e divulgar programas de formação em tecnologia**, conectando instituições que oferecem iniciativas com estudantes interessados em ingressar no setor de TI.

---

## 📌 Contextualização
O setor de tecnologia enfrenta um déficit anual de mais de **100 mil profissionais** no Brasil.  
Nosso projeto busca reduzir essa lacuna criando um **hub de programas de formação**, facilitando o acesso e aumentando a visibilidade para novos talentos.

---

## 🚀 Objetivos
- Reunir **programas de formação em TI** em um só lugar.
- Permitir que estudantes criem perfis e recebam alertas de oportunidades.
- Oferecer às instituições uma forma simples de divulgar suas iniciativas.
- Criar uma base sólida para futuras integrações com APIs externas e automação de notificações.

---

## 🏗 Estrutura do Projeto

src/
📂 app
   ├── 📂 (public)
   │   ├── 📂 programas
   │   │   ├── 📄 page.tsx          → lista de programas
   │   │   └── 📄 [id]/page.tsx     → detalhes do programa
   │   ├── 📄 instituicoes/page.tsx
   │   ├── 📄 favoritos/page.tsx
   │   ├── 📄 perfil/page.tsx
   │   └── 📄 api-mock/route.ts     → mock inicial de API
   └── 📄 layout.tsx                → Layout global
📂 components                       → UI global (Header, Footer, etc.)
📂 features
   ├── 📂 programa
   │   ├── 🧩 ProgramaCard.tsx
   │   └── ⚙️ programaService.ts
   └── 📂 instituicao
       └── 🧩 InstituicaoCard.tsx
📂 lib                              → utils e fetchers
📂 store                            → estado global
📂 types                            → tipos globais
📂 mocks                            → dados mockados

---

## 🖥️ Tecnologias Utilizadas
- [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) (estilização)
- [Zustand](https://zustand-demo.pmnd.rs/) (estado global - opcional)
- [Next API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (mock inicial de API)

---

## 📦 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (>= 18.x)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos
```bash
# Clonar o repositório
git clone https://github.com/SEU-USUARIO/next-talent.git

# Entrar no diretório
cd next-talent

# Instalar dependências
npm install

# Rodar o projeto em desenvolvimento
npm run dev

```
## 👨‍💻 Time de Desenvolvimento

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
