import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useState, useEffect } from 'react';
import Button from '../components/Button';

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
    <div className="flex flex-col items-center justify-center h-full ">
      <div className=" w-[300px] rounded-lg flex flex-col items-center ">
        <div className=" w-[300px] flex flex-col ">
          <Input
            variant="primary"
            placeholder="Digite seu email"
            value={email}
            setValue={setEmail}
            iconStart={<i className="las la-envelope"></i>}
          />
          <Input
            variant="primary"
            placeholder="Digite sua senha"
            value={password}
            setValue={setPassword}
            type="password"
            iconStart={<i class="las la-lock"></i>}
          />

          <Button className="mt-[24px]" onClick={autenticateUser}>
            LOGIN
          </Button>
        </div>

        <div className="w-full flex items-center justify-end mt-2">
          <Link to="/register" className=" text-white ">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
