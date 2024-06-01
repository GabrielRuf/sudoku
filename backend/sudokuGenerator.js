const sudoku = require('sudoku');

function generateSudoku() {
  const puzzle = sudoku.makepuzzle();
  const solution = sudoku.solvepuzzle(puzzle);

  // Converter para uma matriz 2D
  const puzzle2D = [];
  for (let i = 0; i < 9; i++) {
    puzzle2D.push(puzzle.slice(i * 9, (i + 1) * 9).map(value => (value === null ? '' : value + 1)));
  }

  return { puzzle: puzzle2D, solution };
}

module.exports = { generateSudoku };
