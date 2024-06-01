import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import '../assets/Board.css';

function Board({ initialBoard }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const boardWithFixed = initialBoard.map(row =>
      row.map(value => ({
        value: value,
        isFixed: value !== '' // Marcar células com valor inicial como fixas
      }))
    );
    setBoard(boardWithFixed);
  }, [initialBoard]);

  const handleChange = (row, col) => (event) => {
    const value = event.target.value.replace(/[^1-9]/g, '');
    if (value === "" || isValidMove(board, row, col, value)) {
      const newBoard = [...board];
      newBoard[row][col] = { ...newBoard[row][col], value };
      setBoard(newBoard);
    }
  };

  const handleDoubleClick = (row, col) => {
    const newBoard = [...board];
    if (!newBoard[row][col].isFixed) {
      newBoard[row][col] = { ...newBoard[row][col], value: "" }; // Limpa a célula no duplo clique
      setBoard(newBoard);
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell.value}
              onChange={handleChange(rowIndex, colIndex)}
              onDoubleClick={() => handleDoubleClick(rowIndex, colIndex)}
              isFixed={cell.isFixed}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function isValidMove(board, row, col, value) {
  const numValue = parseInt(value, 10);

  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === numValue && i !== col) {
      return false;
    }
  }

  for (let j = 0; j < 9; j++) {
    if (board[j][col].value === numValue && j !== row) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j].value === numValue &&
          (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }
  return true;
}


export default Board;
