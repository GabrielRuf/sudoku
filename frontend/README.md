# Sudoku Game Frontend

Este é o frontend de um jogo de Sudoku desenvolvido com React. O aplicativo permite aos usuários fazer login, registrar-se, jogar Sudoku, reiniciar o jogo e finalizar o jogo. Ele também possui um cronômetro para monitorar o tempo gasto em cada jogo.

## Funcionalidades

- **Autenticação de Usuário:** Permite que os usuários façam login e se registrem.
- **Iniciar Jogo:** Reinicia ou inicia o tabuleiro de Sudoku com um novo quebra-cabeça.
- **Finalizar Jogo:** Finaliza o jogo atual e verifica se a solução está correta.
- **Cronômetro:** Monitora o tempo gasto em cada jogo.
- **Persistência de Sessão:** Usa cookies para manter os usuários autenticados.

## Estrutura do Projeto

```
sudoku-game/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── assets/
│   │   ├── App.css
│   │   └── ...
│   ├── components/
│   │   ├── Api.js
│   │   ├── Board.js
│   │   ├── Cell.js
│   │   ├── GameControls.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── SudokuTitle.js
│   │   └── Timer.js
│   ├── utils/
│   │   └── sudoku.js
│   ├── App.js
│   ├── index.js
│   └── ...
│
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados na sua máquina.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/GabrielRuf/sudoku.git
```

2. Navegue até o diretório do projeto:

```bash
cd frontend
```

3. Instale as dependências:

```bash
npm install
```

## Configuração

1. Certifique-se de que o backend do jogo de Sudoku esteja em execução.
2. Atualize a URL base da API no arquivo `Api.js`, se necessário.

## Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`.

## Componentes Principais

### App.js

O componente principal que gerencia o estado da aplicação, incluindo autenticação, cronômetro e tabuleiro de Sudoku.

### Board.js

Renderiza o tabuleiro de Sudoku e lida com a entrada do usuário.

### Cell.js

Representa uma célula individual no tabuleiro de Sudoku.

### GameControls.js

Contém os botões de controle do jogo, como "Iniciar" e "Logout".

### Login.js

Formulário de login para autenticação do usuário.

### Register.js

Formulário de registro para criação de novos usuários.

### Timer.js

Cronômetro que monitora o tempo gasto em cada jogo.

### SudokuTitle.js

Componente de título do jogo.

### Api.js

Configuração do Axios para comunicação com o backend.

### sudoku.js

Utilitários para validação de solução e conversão de arrays.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Você pode abrir issues e pull requests no GitHub.
