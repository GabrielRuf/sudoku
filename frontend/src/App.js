import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './components/Board';
import Login from './components/Login';
import Register from './components/Register';
import SudokuTitle from './components/SudokuTitle';
import './assets/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetchSudoku();
  }, []);

  const fetchSudoku = async () => {
    try {
      const response = await axios.get('http://localhost:3001/sudoku');
      setBoard(response.data.puzzle);
    } catch (error) {
      console.error('Erro ao buscar o tabuleiro de Sudoku:', error);
    }
  };

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleRegister = (userData) => {
    console.log('Dados do usuário registrado:', userData);
    setShowRegister(false);
  };

  const handleReset = () => {
    fetchSudoku(); // Obtém um novo tabuleiro de Sudoku da API
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div className="board-container">
          <SudokuTitle />
          <Board initialBoard={board} />
          <div className="game-controls">
            <button onClick={handleReset}>Reiniciar</button>
          </div>
        </div>
      ) : showRegister ? (
        <Register onRegister={handleRegister} />
      ) : (
        <Login onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />
      )}
    </div>
  );
}

export default App;
