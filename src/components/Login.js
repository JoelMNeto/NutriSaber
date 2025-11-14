import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      setError('Por favor preencha usuário e senha.');
      return;
    }

    setError('');

    console.log('Login simulado:', { username, password });
    alert(`Bem-vindo ao Nutrisaber, ${username}! (login simulado)`);
  }

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>

        <h1>Bem-vindo ao <span className="color-blue"> Nutrisaber</span>!</h1>

        {error && <div className="login-error">{error}</div>}

        <label className="login-label">
          Nome do Usuário
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
            className="login-input"
            autoComplete="username"
          />
        </label>

        <label className="login-label">
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="login-input"
            autoComplete="current-password"
          />
        </label>

        <button type="submit" className="login-button">Entrar</button>
        
        <div className="login-register">
          <span>Nao possui uma conta? </span>
          <Link to="/register" className="register-link">Cadastre-se aqui</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
