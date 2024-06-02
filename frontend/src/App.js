import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from './components/Api';
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
    const verifyToken = async () => {
      const token = Cookies.get('jwt');
      if (token) {
        try {
          await api.get('verify-token');
          setIsAuthenticated(true);
          fetchSudoku();
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsAuthenticated(false);
          Cookies.remove('jwt');  // Optional: clear the cookie if token is invalid
        }
      }
    };

    verifyToken();
  }, []);

  const fetchSudoku = async () => {
    try {
      const response = await api.get('sudoku');
      setBoard(response.data.puzzle);
    } catch (error) {
      console.error('Erro ao buscar o tabuleiro de Sudoku:', error);
    }
  };

  const handleLogin = (token) => {
    Cookies.set('jwt', token, { expires: 1 });
    setIsAuthenticated(true);
    setShowRegister(false);
    fetchSudoku();
  };

  const handleRegister = (userData) => {
    console.log('Dados do usuário registrado:', userData);
    setShowRegister(false);
  };

  const handleReset = () => {
    fetchSudoku();
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
