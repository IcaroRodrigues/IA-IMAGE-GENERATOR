import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useState, useEffect } from 'react';
import Button from '../components/Button';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
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

  function validateForm() {
    let valid = true;
    const newErrors = { email: '', password: '' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      newErrors.email = 'Digite um email válido.';
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = 'Campo obrigatório.';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  }

  async function autenticateUser() {
    if (!validateForm()) return;
    try {
      const dados = { email, password };
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors((prev) => ({ ...prev, password: result.error || 'E-mail ou senha inválidos' }));
        return;
      }
      window.localStorage.setItem('token', result.token);
      navigate('/feed');
    } catch (error) {
      console.error(error);
      setErrors(error);
    }
  }
  if (loading) return null;

  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <div className="w-[300px]  flex flex-col items-center ">
        <div className="w-[300px] flex flex-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              autenticateUser();
            }}
            className="flex flex-col gap-4 mb-6"
          >
            <Input
              variant="primary"
              placeholder="Digite seu email"
              value={email}
              setValue={setEmail}
              iconStart={<i className="las la-envelope text-xl"></i>}
              error={errors.email}
            />
            <Input
              variant="primary"
              placeholder="Digite sua senha"
              value={password}
              setValue={setPassword}
              type="password"
              error={errors.password}
              iconStart={<i className="las la-lock text-xl"></i>}
            />

            <Button type="submit">LOGIN</Button>

            <div className="w-full flex justify-end">
              <Link to="/register" className="text-white ">
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
