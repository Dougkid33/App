
# Sistema de Aluguel de Chaves para Faculdade

Este projeto é um sistema web desenvolvido para facilitar o gerenciamento de aluguel de chaves dentro de uma instituição de ensino, permitindo que alunos e professores aluguem e devolvam chaves de salas, enquanto administradores têm controle total sobre usuários, aluguéis e chaves.

## Funcionalidades

- **Alunos e Professores:**
  - Alugar chaves.
  - Devolver chaves.
- **Administradores:**
  - Criar e deletar usuários.
  - Gerenciar aluguéis.
  - Adicionar e remover chaves do sistema.

## Tecnologias Utilizadas

### Backend

O backend é construído com Node.js, utilizando as seguintes tecnologias:

- Express.js para o servidor web.
- Sequelize como ORM para interação com o banco de dados MySQL.
- bcryptjs para hashing de senhas.
- jsonwebtoken para autenticação via JWT.
- CORS para permitir o acesso ao servidor a partir de domínios diferentes.
- dotenv para gerenciar variáveis de ambiente.

### Frontend
O frontend é desenvolvido com React, utilizando a ferramenta Vite para build e desenvolvimento, e conta com as seguintes bibliotecas:

- Material UI para componentes de UI.
- Axios para chamadas HTTP.
- date-fns para manipulação de datas.
- jwt-decode para decodificar tokens JWT.
- notistack para notificações.
- react-router-dom para roteamento.
## Configuração e Execução

### Configurando o Backend

1.  Instale as dependências com `npm install`.
2.  Configure as variáveis de ambiente de acordo com o exemplo `.env.example`.
3.  Inicie o servidor com `npm start`.


### Configurando o Frontend

1.  Navegue até o diretório do frontend e instale as dependências com `npm install`.
2.  Execute o projeto localmente com `npm run dev`.

## Arquitetura DAO

A arquitetura do projeto segue o padrão DAO (Data Access Object), facilitando a interação com o banco de dados através de objetos específicos para cada entidade (Usuários, Chaves, Aluguéis).


## Banco de Dados: MySQL

O banco de dados utiliza o MySQL e é composto por três tabelas principais, `usuario`, `chave`, e `emprestimo`, que são fundamentais para a funcionalidade do sistema de aluguel de chaves.

### Tabelas e Relacionamentos

#### 1. Usuario

Armazena informações dos usuários, sejam eles administradores, alunos ou professores.

-   **id:** Chave primária, autoincrementável.
-   **nome:** Nome do usuário.
-   **idade:** Idade do usuário.
-   **sexo:** Sexo do usuário, podendo ser 'Masculino', 'Feminino' ou 'Outro'.
-   **email:** E-mail do usuário.
-   **user:** Nome de usuário para login.
-   **password:** Senha do usuário.
-   **cargo:** Descrição do cargo do usuário.
-   **tipoUsuario:** Tipo do usuário ('Administrador', 'Aluno', 'Professor').

#### 2. Chave

Contém detalhes das chaves disponíveis para empréstimo.

-   **ID:** Chave primária, autoincrementável.
-   **SalaDaChave:** Identificação da sala ou espaço que a chave abre.
-   **SituacaoEmprestimo:** Status do empréstimo da chave (true para emprestado, false para disponível).
-   **Descricao:** Descrição adicional da chave ou local.

#### 3. Emprestimo

Registra os empréstimos realizados no sistema.

-   **ID:** Chave primária, autoincrementável.
-   **DataHoraEmprestimo:** Data e hora do início do empréstimo.
-   **DataHoraDevolucao:** Data e hora da devolução da chave.
-   **Status:** Estado do empréstimo (ativo ou finalizado).
-   **Usuario_ID:** Referência ao usuário que realizou o empréstimo.
-   **Chave_ID:** Referência à chave emprestada.

### Relacionamentos

-   **Usuario-Emprestimo:** Relacionamento um-para-muitos entre `usuario` e `emprestimo`, indicando que um usuário pode ter múltiplos empréstimos, mas cada empréstimo é associado a apenas um usuário.
-   **Chave-Emprestimo:** Relacionamento um-para-muitos entre `chave` e `emprestimo`, onde uma chave pode ter vários empréstimos registrados ao longo do tempo, mas cada empréstimo refere-se a uma única chave.

### Implementação com Sequelize

Os modelos Sequelize refletem as tabelas e relações do banco de dados, facilitando a interação com o MySQL através de uma API de alto nível. As referências entre tabelas são estabelecidas usando a propriedade `references`, que define explicitamente as chaves estrangeiras e as relações entre os modelos.

### Considerações Finais

Esta estrutura de banco de dados e a implementação do Sequelize oferecem um sistema robusto para gerenciar o aluguel de chaves dentro da faculdade, permitindo funcionalidades complexas como registro e gerenciamento de usuários, chaves e empréstimos de maneira eficaz e segura. É essencial garantir que as referências e relações entre tabelas estejam corretas para manter a integridade dos dados e suportar as operações do sistema de maneira eficiente.
