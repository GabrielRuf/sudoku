
export function createEmptyBoard() {
  const board = new Array(9).fill(null).map(() => new Array(9).fill(""));
  return board;
}

// Função que cria um tabuleiro inicial (pode ser ajustada para gerar aleatoriamente)
export function createInitialBoard() {
  const board = new Array(9).fill(null).map(() => new Array(9).fill(""));
  // Aqui você pode adicionar lógica para preencher algumas células se desejar
  return board;
}

export function isValidMove(board, row, col, value) {
  // Verificar linha
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value && i !== col) {
      return false;
    }
  }

  // Verificar coluna
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === value && i !== row) {
      return false;
    }
  }

  // Verificar quadrante 3x3
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j].value === value &&
          (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }

  return true;
}
