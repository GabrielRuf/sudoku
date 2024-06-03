### Documentação da API

Esta API fornece endpoints para um jogo de Sudoku, incluindo autenticação de usuário e geração de puzzles de Sudoku. Abaixo está a documentação detalhada para cada endpoint disponível.

#### URL Base
```
http://localhost:3001
```

### Endpoints

#### 1. Registrar Usuário

**Endpoint**: `/auth/register`

**Método**: `POST`

**Descrição**: Registra um novo usuário com um nome de usuário e senha.

**Corpo da Requisição**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Respostas**:
- `201 Created`: Usuário registrado com sucesso.
- `400 Bad Request`: Usuário já existe.

#### 2. Login do Usuário

**Endpoint**: `/auth/login`

**Método**: `POST`

**Descrição**: Faz o login de um usuário e retorna um token JWT para autenticação.

**Corpo da Requisição**:
```json
{
  "username": "string",
  "password": "string"
}
```

**Respostas**:
- `200 OK`: 
  ```json
  {
    "token": "jwt_token"
  }
  ```
- `401 Unauthorized`: Nome de usuário ou senha inválidos.

#### 3. Verificar Token

**Endpoint**: `/verify-token`

**Método**: `GET`

**Descrição**: Verifica a validade do token JWT.

**Cabeçalhos**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Respostas**:
- `200 OK`: 
  ```json
  {
    "message": "Token is valid"
  }
  ```
- `401 Unauthorized`: Token inválido ou expirado.

#### 4. Gerar Puzzle de Sudoku

**Endpoint**: `/sudoku`

**Método**: `GET`

**Descrição**: Gera um novo puzzle de Sudoku com sua solução. Este endpoint é protegido e requer um token JWT válido.

**Cabeçalhos**:
```json
{
  "Authorization": "Bearer jwt_token"
}
```

**Respostas**:
- `200 OK`: 
  ```json
  {
    "puzzle": [[1, 0, 3, ...], [4, 5, 0, ...], ...],
    "solution": [1, 2, 3, 4, 5, 6, 7, 8, 9, ...]
  }
  ```
- `401 Unauthorized`: Token inválido ou expirado.

### Middleware

#### Middleware de Verificação de Token

**Arquivo**: `verifyToken.js`

**Descrição**: Middleware para verificar o token JWT para rotas protegidas.

**Código**:
```javascript
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send('Invalid Token');
  }
}

module.exports = verifyToken;
```

### Utilitários

#### Gerar Puzzle de Sudoku

**Arquivo**: `sudokuGenerator.js`

**Descrição**: Gera um puzzle de Sudoku e sua solução.

**Código**:
```javascript
const sudoku = require('sudoku');

function generateSudoku() {
  const puzzle = sudoku.makepuzzle();
  const solution = sudoku.solvepuzzle(puzzle);

  const puzzle2D = [];
  for (let i = 0; i < 9; i++) {
    puzzle2D.push(puzzle.slice(i * 9, (i + 1) * 9).map(value => (value === null ? '' : value + 1)));
  }

  return { puzzle: puzzle2D, solution };
}

module.exports = { generateSudoku };
```

### Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   node server.js
   ```

3. O servidor será executado em `http://localhost:3001`.

### Nota

Certifique-se de substituir `'your_jwt_secret'` por uma chave secreta segura para a assinatura e verificação do JWT em um ambiente de produção.