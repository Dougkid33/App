# Sistema de Locação e Empréstimo de Chaves da Faculdade

Este projeto é um sistema de locação e empréstimo de chaves desenvolvido para faculdades, permitindo que administradores controlem o empréstimo de chaves para alunos e professores. Utiliza NodeJS no backend com autenticação JWT, banco de dados MySQL, e React com Material UI no frontend.

## Tecnologias Utilizadas

- **Backend:** NodeJS com JWT para autenticação
- **Banco de Dados:** MySQL
- **Frontend:** React com Material UI

## Funcionalidades

- **Autenticação de Usuários:** Autenticação de administradores utilizando JWT.
- **Gestão de Chaves:** Permite que administradores cadastrem, atualizem e excluam chaves.
- **Reserva de Chaves:** Alunos e professores podem reservar chaves disponíveis para empréstimo.
- **Controle de Disponibilidade:** As chaves só podem ser reservadas se estiverem disponíveis.

## Configuração e Execução

### Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js e o MySQL instalados em sua máquina.

### Configuração do Backend

1. Navegue até a pasta do backend.
2. Instale as dependências com `npm install`.
3. Configure o acesso ao banco de dados MySQL no arquivo `config.js`.
4. Execute as migrações do banco de dados, se necessário.
5. Inicie o servidor com `npm run start`.

### Configuração do Frontend

1. Navegue até a pasta do frontend.
2. Instale as dependências com `npm install`.
3. Inicie a aplicação com `npm start`.
4. A aplicação estará acessível em `http://localhost:3000`.

## Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para criar um fork do projeto e submeter suas Pull Requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.
