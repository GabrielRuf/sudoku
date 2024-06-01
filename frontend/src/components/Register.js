import React, { useState } from 'react';
import '../assets/Login.css';
import SudokuTitle from './SudokuTitle'; // Importa o componente SudokuTitle

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({ username, email, password });
    alert('Usuário registrado com sucesso!');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <SudokuTitle /> {/* Adiciona o título aqui */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Nome de Usuário:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="button-container">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
