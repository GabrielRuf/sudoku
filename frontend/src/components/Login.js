import React, { useState } from 'react';
import api from './Api'; // Importe a instância configurada de Axios
import '../assets/Login.css';
import SudokuTitle from './SudokuTitle';
import Cookies from 'js-cookie';


function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Usar a instância `api` configurada com Axios
      const response = await api.post('/auth/login', {
        username,
        password
      });
      const { token } = response.data; 

      Cookies.set('jwt', token, { expires: 1 }); // Expira em 1 dia

      console.log(token);
      onLogin(token); // Chamada de callback para lidar com o estado de login no componente pai
    } catch (error) {
      alert('Credenciais inválidas');
      console.error('Erro de login:', error);
    }
  };

  return (
    <div className="login-container">
      <SudokuTitle />
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="button-container">
          <button type="submit">Login</button>
          <button type="button" className="register-button" onClick={onShowRegister}>Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
