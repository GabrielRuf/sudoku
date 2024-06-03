import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from './components/Api';
import Board from './components/Board';
import Login from './components/Login';
import Register from './components/Register';
import SudokuTitle from './components/SudokuTitle';
import Timer from './components/Timer';
import './assets/App.css';
import { validateSolution } from './utils/sudoku'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [resetCount, setResetCount] = useState(0);

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
    setSolution(null);
  };

  const handleReset = async () => {
    setResetCount(prev => prev + 1);
    setTimerRunning(true);
    try {
      const response = await api.get('sudoku');
      setBoard(response.data.puzzle);
      setSolution(response.data.solution);
    } catch (error) {
      console.error('Error fetching the Sudoku board:', error);
    }
  };

  const handleFinishGame = () => {
    setTimerRunning(false);
    if (board && validateSolution(board, solution)) {
      alert("Parabéns! Você solucionou o Sudoku corretamente.");
    } else {
      alert("A solução está incorreta. Por favor, tente novamente.");
    }
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
            <button onClick={handleReset}>Iniciar</button>
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
