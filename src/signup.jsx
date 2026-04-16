import { useState } from 'react';
import { signup } from '../services/api';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup({ name, username, password });
      setMessage(data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
      <p>{message}</p>
    </form>
  );
}

export default Signup;