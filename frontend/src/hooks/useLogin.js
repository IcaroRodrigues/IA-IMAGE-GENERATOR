import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../providers/ToastProvider';
import { loginSchema } from '../validations/loginSchema';
import { initialValues } from '../constants/initialValues';

export const useLogin = () => {
  const navigate = useNavigate();
  const { openToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/feed');
    }
  }, [navigate]);

  const handleLoginSubmit = async (values, actions) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        return openToast({
          title: 'E-mail ou senha inválidos!',
          type: 'error',
        });
      }

      openToast({
        title: 'Login realizado com sucesso!',
        type: 'success',
      });

      window.localStorage.setItem('token', result.token);
      navigate('/feed');
    } catch (error) {
      openToast({
        title: 'Erro ao fazer login',
        type: 'error',
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return {
    initialValues: initialValues.login,
    validationSchema: loginSchema,
    onSubmit: handleLoginSubmit,
  };
};