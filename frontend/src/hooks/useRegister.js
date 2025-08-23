import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../providers/ToastProvider';
import { signupSchema } from '../validations/signupSchema';
import { initialValues } from '../constants/initialValues';
import { CREATE_USER_URL } from '../constants/urls.js';

export const useRegister = () => {
  const navigate = useNavigate();
  const { openToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/feed');
    }
  }, [navigate]);

  const handleSignupSubmit = async (values, actions) => {
    try {
      const response = await fetch(CREATE_USER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        return openToast({
          title: result.error || 'Erro ao criar conta',
          type: 'error',
        });
      }

      window.localStorage.setItem('token', result.token);

      openToast({
        title: 'Conta criada com sucesso!',
        type: 'success',
      });
      navigate('/feed');
    } catch (error) {
      console.error(error);
      openToast({
        title: 'Erro ao criar conta',
        type: 'error',
      });
    }
  };

  return {
    initialValues: initialValues.signup,
    validationSchema: signupSchema,
    onSubmit: handleSignupSubmit,
  };
};