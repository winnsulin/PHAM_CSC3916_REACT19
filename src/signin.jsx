import { useState } from 'react';
import { signin } from '../services/api';

function Signin({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signin({ username, password });
      setToken(data.token); // Store JWT token in parent state or localStorage
      setMessage('Signin successful!');
      localStorage.setItem('token', data.token);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error signing in');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Signin</button>
      <p>{message}</p>
    </form>
  );
}

export default Signin;