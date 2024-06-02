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
          Cookies.remove('jwt');
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
      console.error('Error fetching the Sudoku board:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
    fetchSudoku();
  };

  const handleLogout = () => {
    Cookies.remove('jwt');
    setIsAuthenticated(false);
  };

  const handleRegister = (userData) => {
    console.log('User registered:', userData);
    setShowRegister(false);
  };

  const handleReset = () => {
    fetchSudoku();
  };

  return (
    <div className="App">
      <SudokuTitle />
      {isAuthenticated ? (
        <div className="game-layout">
          <div className="board-container">
          <Board initialBoard={board} />
          </div>
          <div className="navbar-vertical">
            <button onClick={handleReset}>Reiniciar</button>
            <button onClick={handleLogout}>Logout</button>
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
