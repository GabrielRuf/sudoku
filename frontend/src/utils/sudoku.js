export function isValidMove(board, row, col, value) {
  // Verifica linha
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === value && i !== col) {
      return false;
    }
  }

  // Verifica coluna
  for (let i = 0; i < 9; i++) {
    if (board[i][col].value === value && i !== row) {
      return false;
    }
  }

  // Verifica quadrante 3x3
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

export const convertSolutionToMatrix = (solution) => {
  const solutionMatrix = [];
  for (let i = 0; i < 9; i++) {
    solutionMatrix.push(solution.slice(i * 9, i * 9 + 9));
  }
  return solutionMatrix;
};

export const validateSolution = (board, solution) => {
  const solutionMatrix = convertSolutionToMatrix(solution);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '' && parseInt(board[i][j], 10) !== solutionMatrix[i][j]) {
        return false;
      }
    }
  }
  return true;
};
