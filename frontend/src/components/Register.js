import React, { useState } from 'react';
import api from './Api';  // Ajuste o caminho de acordo com a localização do seu Api.js
import '../assets/Login.css';
import SudokuTitle from './SudokuTitle';  // Importa o componente SudokuTitle

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Chamada para a API de registro usando a instância configurada de Axios
      const response = await api.post('auth/register', {
        username,
        password
      });

      if (response.status === 201) {
        alert('Usuário registrado com sucesso!');
        onRegister(true); // Notifica o componente pai sobre o registro bem-sucedido
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      if (error.response) {
        // A resposta foi recebida mas indicou um erro
        alert('Erro no registro: ' + error.response.data);
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        alert('Erro no registro: Nenhuma resposta do servidor');
      } else {
        // Algo errado na requisição
        alert('Erro no registro: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <SudokuTitle />
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Nome de Usuário:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
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
