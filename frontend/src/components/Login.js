import React, { useState } from 'react';
import '../assets/Login.css';
import SudokuTitle from './SudokuTitle'; 

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password') {
      const token = createToken({ username });
      console.log(token);
      onLogin(token);
    } else {
      alert('Credenciais inválidas');
      onLogin(null);
    }
  };

  function createToken(payload) {
    const header = {
      alg: "HS256",
      typ: "JWT"
    };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = "signature";

    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  return (
    <div className="login-container">
      <SudokuTitle /> {/* Adiciona o título aqui */}
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
