import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useState, useEffect } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/feed');
    } else {
      setLoading(false);
    }
  }, [navigate]);

  async function autenticateUser() {
    try {
      const dados = { email, password };
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const result = await response.json();
      console.log(result.token);
      window.localStorage.setItem('token', result.token);

      navigate('/feed');
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return null;

  return (
    <div>
      <h1 className="text-3xl text-white mb-4">Login</h1>
      <Link to="/register" className="text-3xl text-white">
        Register
      </Link>

      <button onClick={autenticateUser}>Login</button>
    </div>
  );
};
