import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from './components/Api';
import Board from './components/Board';
import Login from './components/Login';
import Register from './components/Register';
import SudokuTitle from './components/SudokuTitle';
import Timer from './components/Timer';
import './assets/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [board, setBoard] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetCount, setResetCount] = useState(0);  // Use um contador para resets

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get('jwt');
      if (token) {
        try {
          await api.get('verify-token');
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          setIsAuthenticated(false);
          Cookies.remove('jwt');
        }
      }
    };

    verifyToken();
  }, []);

  const handleLogin = (token) => {
    Cookies.set('jwt', token, { expires: 1 });
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    Cookies.remove('jwt');
    setIsAuthenticated(false);
    setTimerRunning(false);
    setBoard(null);
  };

  const handleReset = async () => {
    setResetCount(prev => prev + 1);  // Incrementa o contador para garantir mudança de estado
    setTimerRunning(true);
    try {
      const response = await api.get('sudoku');
      setBoard(response.data.puzzle);
    } catch (error) {
      console.error('Error fetching the Sudoku board:', error);
    }
  };

  const handleFinishGame = () => {
    setTimerRunning(false);
  };

  const handleRegister = async (userData) => {
    try {
      await api.post('register', userData);
      setShowRegister(false);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="App">
      <SudokuTitle />
      {isAuthenticated ? (
        <div className="game-layout">
          {board && <Board initialBoard={board} />}
          <div className="navbar-vertical">
            <Timer running={timerRunning} reset={resetCount} />
            <button onClick={handleReset}>Reiniciar</button>
            <button onClick={handleFinishGame}>Finalizar Jogo</button>
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
