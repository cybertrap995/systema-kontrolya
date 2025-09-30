import React, { useState, useContext } from 'react';
import api from '../api';
import jwtDecode from 'jwt-decode';
import UserContext from '../UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('token/', { username, password })
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        const user = jwtDecode(res.data.access);
        setUser(user);
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
