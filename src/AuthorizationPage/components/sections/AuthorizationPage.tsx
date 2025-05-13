import React, { useState } from 'react';
import { User } from '../../../global_functions/global_interfaces';
import { useNavigate } from 'react-router-dom';
import "../authorization.css"

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const users = [
      {
        login: "IvanZapara",
        password: "04",
        role: 'volunteer'
      },
      {
        login: "ZaparaIvan",
        password: "40",
        role: 'organiser'
      }
  ] as User[]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const foundUser = users.find((u) => u.login === login); // Идентификация

    if (!foundUser || foundUser.password !== password) {
      setError('Неверный логин или пароль');
      return;
    }

    // Авторизация
    onLogin(foundUser);
    if (foundUser.role === 'volunteer') {
      navigate('/volunteer');
    } else {
      navigate('/organiser');
    }
  };

  return (
    <div className='background'>
      <div className='left_column'>
        <h1 className=''>СберВолонтерство</h1>
        <img src='./logo.png'></img>
      </div>
      <div className='right_column'>
        <div className="login-container">
          <h2>Вход</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Войти</button>
          </form>
        </div>
        
      </div>
        
    </div>
    // 
  );
};

export default Login;
